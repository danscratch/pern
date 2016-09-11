
resource "aws_s3_bucket" "db" {
  bucket = "${var.domain_name}-db"
  acl = "private"
  versioning {
    enabled = false
  }
  tags {
    Name = "${var.domain_name}-db"
  }
}

resource "aws_iam_role" "db_iam_role" {
  name = "db_iam_role"
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

resource "aws_iam_instance_profile" "db_instance_profile" {
  name = "db_instance_profile"
  roles = ["db_iam_role"]
}

resource "aws_iam_role_policy" "db_iam_role_policy" {
  name = "db_iam_role_policy"
  role = "${aws_iam_role.db_iam_role.id}"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::${var.domain_name}-db",
        "arn:aws:s3:::${var.domain_name}-puppet-agent"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:DeleteObject",
        "s3:PutObject",
        "s3:GetObject",
        "s3:List*"
      ],
      "Resource": [
        "arn:aws:s3:::${var.domain_name}-db/*",
        "arn:aws:s3:::${var.domain_name}-puppet-agent/*"
      ]
    }
  ]
}
EOF
}

resource "aws_instance" "db" {
  # The connection block tells our provisioner how to
  # communicate with the resource (instance)
  connection {
    # The default username for our AMI
    user = "ubuntu"

    # The connection will use the local SSH agent for authentication.
  }

  instance_type = "t2.micro"
  iam_instance_profile = "${aws_iam_instance_profile.db_instance_profile.id}"

  # Lookup the correct AMI based on the region
  # we specified
  ami = "${var.aws_ami}"

  # The name of our SSH keypair we created above.
  key_name = "${var.key_name}"

  # Our Security group to allow access from the load balancer
  vpc_security_group_ids = [
    "${aws_security_group.web_to_db_server.id}",
    "${aws_security_group.ssh_whitelist.id}",
    "${aws_security_group.internal_open_ports.id}"
  ]

  # We're going to launch into the same subnet as our instances. In a production
  # environment it's more common to have a separate private subnet for
  # backend instances.
  subnet_id = "${aws_subnet.subnet_east_1b.id}"

  # We run a remote provisioner on the instance after creating it.
  # In this case, we just install nginx and start it. By default,
  # this should be on port 80
  provisioner "remote-exec" {
    inline = [
      "sudo sh -c 'echo \"deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main\" >> /etc/apt/sources.list.d/pgdg.list'",
      "wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -",
      "sudo apt-get -y update",
      "sudo apt-get -y install postgresql puppet",
      "curl -O https://bootstrap.pypa.io/get-pip.py",
      "sudo python get-pip.py",
      "sudo pip install awscli"
    ]
  }

  tags {
    Name = "${var.domain_name}-db"
  }
}

resource "aws_route53_record" "db-dns" {
    zone_id = "${aws_route53_zone.private.zone_id}"
    name = "db"
    type = "A"
    ttl = "300"
    records = [ "${aws_instance.db.private_ip}" ]
}
