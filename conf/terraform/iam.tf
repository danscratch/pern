
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
