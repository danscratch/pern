
#############################
# S3

resource "aws_s3_bucket" "release" {
  bucket = "${var.domain_name}-release"
  acl = "private"
  versioning {
    enabled = false
  }
  tags {
    Name = "${var.domain_name}-release"
  }
}

#############################
# IAM

resource "aws_iam_role" "release_iam_role" {
  name = "release_iam_role"
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

resource "aws_iam_instance_profile" "release_instance_profile" {
  name = "release_instance_profile"
  roles = ["release_iam_role"]
}

resource "aws_iam_role_policy" "release_iam_role_policy" {
  name = "release_iam_role_policy"
  role = "${aws_iam_role.release_iam_role.id}"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::${var.domain_name}-release",
        "arn:aws:s3:::${var.domain_name}-puppet-agent"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:DeleteObject",
        "s3:GetObject",
        "s3:PutObject",
        "s3:List*"
      ],
      "Resource": [
        "arn:aws:s3:::${var.domain_name}-release/*",
        "arn:aws:s3:::${var.domain_name}-puppet-agent/*"
      ]
    }
  ]
}
EOF
}

#############################
# EC2 INSTANCE

resource "aws_instance" "release" {
  # The connection block tells our provisioner how to
  # communicate with the resource (instance)
  connection {
    # The default username for our AMI
    user = "ubuntu"

    # The connection will use the local SSH agent for authentication.
  }

  instance_type = "t2.micro"
  iam_instance_profile = "${aws_iam_instance_profile.release_instance_profile.id}"

  ami = "${var.aws_ami}"
  key_name = "${var.key_name}"

  # Our Security group to allow access from the load balancer
  vpc_security_group_ids = [
    "${aws_security_group.ssh_whitelist.id}",
    "${aws_security_group.internal_open_ports.id}"
  ]

  # We're going to launch into the same subnet as our other servers.
  subnet_id = "${aws_subnet.subnet_east_1b.id}"

  # We run a remote provisioner on the instance after creating it.
  provisioner "remote-exec" {
    inline = [
      "sudo apt-get -y update",
      "curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -",
      "sudo apt-get -y install git nodejs build-essential puppet",
      "curl -O https://bootstrap.pypa.io/get-pip.py",
      "sudo python get-pip.py",
      "sudo pip install awscli"
    ]
  }

  tags {
    Name = "${var.domain_name}-release"
    SystemName = "release"
  }
}

#####################
# DNS RECORD

resource "aws_route53_record" "release-dns" {
  zone_id = "${aws_route53_zone.public.zone_id}"
  name = "release"
  type = "CNAME"
  ttl = "300"
  records = [ "${aws_instance.release.public_dns}" ]
}
