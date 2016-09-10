

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
      "sudo apt-get -y install postgresql",
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
