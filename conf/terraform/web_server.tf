
resource "aws_elb" "prod" {
  name = "${var.domain_name}-prod-elb"

  subnets         = ["${aws_subnet.subnet_east_1b.id}", "${aws_subnet.subnet_east_1c.id}"]
  security_groups = ["${aws_security_group.world_visible_lb.id}"]
  # instances       = ["${aws_instance.web.id}"]

  listener {
    instance_port     = 81
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 443
    lb_protocol       = "https"
    ssl_certificate_id  = "arn:aws:acm:us-east-1:702814121938:certificate/7a285716-b6ba-43c7-87b2-2eeb00f46948"
  }

  health_check {
    healthy_threshold = 2
    unhealthy_threshold = 2
    timeout = 3
    target = "HTTP:80/api/ping"
    interval = 5
  }
}



resource "aws_instance" "web" {
  # The connection block tells our provisioner how to
  # communicate with the resource (instance)
  connection {
    # The default username for our AMI
    user = "ubuntu"

    # The connection will use the local SSH agent for authentication.
  }

  instance_type = "t2.micro"
  iam_instance_profile = "${aws_iam_instance_profile.web_instance_profile.id}"

  # Lookup the correct AMI based on the region
  # we specified
  ami = "${var.aws_ami}"

  # The name of our SSH keypair we created above.
  key_name = "${var.key_name}"

  # Our Security group to allow access from the load balancer
  vpc_security_group_ids = [
    "${aws_security_group.lb_to_web_server.id}"
  ]

  # We're going to launch into the same subnet as our ELB. In a production
  # environment it's more common to have a separate private subnet for
  # backend instances.
  subnet_id = "${aws_subnet.subnet_east_1b.id}"

  # We run a remote provisioner on the instance after creating it.
  # In this case, we just install nginx and start it. By default,
  # this should be on port 80
  provisioner "remote-exec" {
    inline = [
      "sudo apt-get -y update",
      "curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -",
      "sudo apt-get -y install nginx git nodejs build-essential",
      "sudo npm install -g pm2",
      "curl -O https://bootstrap.pypa.io/get-pip.py",
      "sudo python get-pip.py",
      "sudo pip install awscli"
    ]
  }
}
