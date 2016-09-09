variable "aws_region" {
  description = "AWS region to launch servers."
  default = "us-east-1"
}

variable "domain_name" {
  default = "gezeit"
}

variable "public_key_path" {
  default = "~/.ssh/terraform.pub"
}

variable "key_name" {
  default = "gezeit-web-keypair"
}

# Ubuntu 14.04 EBS
variable "aws_ami_no_ssd" {
  default = "ami-d90d92ce"
}

# Ubuntu 14.04 EBS-SSD
variable "aws_ami" {
  default = "ami-8e0b9499"
}
