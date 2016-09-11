

resource "aws_route53_zone" "public" {
   name = "${var.domain_name}.com."
   comment = "public zone for ${var.domain_name}.com (managed by terraform)"
   force_destroy = false
}

resource "aws_route53_zone" "private" {
   name = "${var.domain_name}.com."
   comment = "private zone for ${var.domain_name}.com (managed by terraform)"
   vpc_id = "${aws_vpc.default.id}"
   force_destroy = false
}
