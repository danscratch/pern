

#####################
# S3 BUCKET

resource "aws_s3_bucket" "puppet_master" {
  bucket = "${var.domain_name}-puppet-master"
  acl = "private"
  versioning {
    enabled = false
  }
  tags {
    Name = "${var.domain_name}-puppet-master"
  }
}

resource "aws_s3_bucket" "puppet_agent" {
  bucket = "${var.domain_name}-puppet-agent"
  acl = "private"
  versioning {
    enabled = false
  }
  tags {
    Name = "${var.domain_name}-puppet-agent"
  }
}

#####################
# IAM ROLE

resource "aws_iam_role" "puppet_master_iam_role" {
  name = "puppet_master_iam_role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_instance_profile" "puppet_master_instance_profile" {
  name = "puppet_master_instance_profile"
  roles = ["puppet_master_iam_role"]
}

resource "aws_iam_role_policy" "puppet_master_iam_role_policy" {
  name = "puppet_master_iam_role_policy"
  role = "${aws_iam_role.puppet_master_iam_role.id}"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::${var.domain_name}-puppet-master"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:List*"
      ],
      "Resource": ["arn:aws:s3:::${var.domain_name}-puppet-master/*"]
    }
  ]
}
EOF
}

#####################
# SECURITY GROUP

resource "aws_security_group" "puppet_master_server" {
  name        = "puppet_master_server"
  description = "security group for web servers to access the puppet master"
  vpc_id      = "${aws_vpc.default.id}"

  # HTTP access from anywhere
  ingress {
    from_port   = 8140
    to_port     = 8140
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  # outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

#####################
# EC2 INSTANCE

resource "aws_instance" "puppet_master" {
  # The connection block tells our provisioner how to
  # communicate with the resource (instance)
  connection {
    # The default username for our AMI
    user = "ubuntu"

    # The connection will use the local SSH agent for authentication.
  }

  count = 0
  instance_type = "t2.micro"
  iam_instance_profile = "${aws_iam_instance_profile.puppet_master_instance_profile.id}"

  ami = "${var.aws_ami}"
  key_name = "${var.key_name}"

  vpc_security_group_ids = [
    "${aws_security_group.puppet_master_server.id}",
    "${aws_security_group.ssh_whitelist.id}",
    "${aws_security_group.internal_open_ports.id}"
  ]

  # We're going to launch into the same subnet as our instances.
  subnet_id = "${aws_subnet.subnet_east_1b.id}"

  # We run a remote provisioner on the instance after creating it.
  provisioner "remote-exec" {
    inline = [
      "sudo apt-get -y update",
      "sudo apt-get -y install puppetmaster",
      "curl -O https://bootstrap.pypa.io/get-pip.py",
      "sudo python get-pip.py",
      "sudo pip install awscli"
    ]
  }

  tags {
    Name = "${var.domain_name}-puppet_master"
    SystemName = "puppet_master"
  }
}

#####################
# DNS RECORD

resource "aws_route53_record" "puppet-master-dns" {
  count = 0
  zone_id = "${aws_route53_zone.private.zone_id}"
  name = "puppet"
  type = "A"
  ttl = "300"
  records = [ "${aws_instance.puppet_master.private_ip}" ]
}
