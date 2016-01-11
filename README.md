# node-mongodb-vagrant
This is a boilerplate vagrant solution for students taking the course sevrer based web programming at the Linnaeus University, Kalmar, Sweden

Following stuff will be installed:
* node.js, latest stable (OBS not LTS) version
* npm (along with node.js)
* mongodb - noSQL database, latest version
* redis server - fast in memory server, version 3.0.6

To get this to work, you must have VirtualBox and Vagrant installed. Installers for VirtualBox are available at http://www.virtualbox.org, and installers for
Vagrant are available at http://www.vagrantup.com.

Clone this repo to a folder on your local system and give it a name of your own (my_project in this case)

    git clone https://github.com/1dv023/node-mongodb-vagrant.git my_project

go to that directory and start up the vagrant machine

    cd my_project
    vagrant up

The Vagrantfile will download and install the hashicorp/precise32 vagrant box if you don't
already have it.

After a few minutes, you should have a virtual dev environment with node, npm, mongodb and redis.
The port 8000 on the VM is forwarded to port 8000 on the localhost.

You can test out your environment by ssh'ing into your environment and running the sample script:

    vagrant ssh
    node app.js

## Important note about Installing NPM Packages

There are problems installing npm packages in a vagrant machine running Virtual Box on Windows. This goes for certain packages as "jade" and "express" which are trying to create symlinks during installation

This can cause problems when you're attempting to install certain packages via npm. For
example, the 'jade' and 'express' packages create symlinks during installation.

The best workaround for this is to install node packages in your shared folder with the
--no-bin-links flag, e.g.

    npm install express --no-bin-links

You can also try to install the package as globals if you need to execture the bin-file

    npm install jade -g

This vagrant images is tested on Mac OSX Yosemite with Virtual Box version 5.0.10 and Vagrant version 1.7.4
