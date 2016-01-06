#!/bin/bash

# With love and cred to https://github.com/Turistforeningen
# Modified from https://github.com/Turistforeningen/node-vagrant-template

# Update & Install
echo "Updating and installing system packages..."
apt-get update
apt-get install -y build-essential git curl

# Reading Environment Varaibles
echo "Reading environment variables..."

# Check if env/ directory exists
if [ -d /vagrant/env/ ]; then
  for path in /vagrant/env/*; do
    name=${path##*/}
    # Do not include dotfiles or empty directory (*)
    if [[ "$name" != "*" ]] && [[ ${name:0:1} != "." ]]; then
      echo "$name=$(cat $path)"
      echo "export $name=$(cat $path)" >> /home/vagrant/.bashrc
    fi
  done
fi
