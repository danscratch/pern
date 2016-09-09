

resource "aws_s3_bucket" "releases" {
  bucket = "${var.domain_name}-releases"
  acl = "private"
  versioning {
    enabled = false
  }
  tags {
    Name = "${var.domain_name}-releases"
  }
}
