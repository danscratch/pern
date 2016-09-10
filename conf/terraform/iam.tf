
#####################
# WEB SERVER ROLES
#####################

resource "aws_iam_role" "web_iam_role" {
  name = "web_iam_role"
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

resource "aws_iam_instance_profile" "web_instance_profile" {
  name = "web_instance_profile"
  roles = ["web_iam_role"]
}

resource "aws_iam_role_policy" "web_iam_role_policy" {
  name = "web_iam_role_policy"
  role = "${aws_iam_role.web_iam_role.id}"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::${var.domain_name}-releases"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:List*"
      ],
      "Resource": ["arn:aws:s3:::${var.domain_name}-releases/*"]
    }
  ]
}
EOF
}


#####################
# DB SERVER ROLES
#####################

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
      "Resource": ["arn:aws:s3:::${var.domain_name}-db"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:DeleteObject",
        "s3:PutObject",
        "s3:GetObject",
        "s3:List*"
      ],
      "Resource": ["arn:aws:s3:::${var.domain_name}-db/*"]
    }
  ]
}
EOF
}
