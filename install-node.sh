# Setting Environment Varaibles
echo "Setting environment variables..."
echo "export NODE_ENV=development" >> /home/vagrant/.bashrc
echo "cd /vagrant" >> /home/vagrant/.bashrc

# Installing nvm
echo "Installing nvm..."
export HOME=/home/vagrant
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
echo "source ~/.nvm/nvm.sh" >> /home/vagrant/.bashrc
source /home/vagrant/.nvm/nvm.sh

# Installing Node.JS
echo "Installing Node.JS..."
nvm install stable
chown -R vagrant:vagrant /home/vagrant/.nvm
export HOME=/home/root

# add bin folder to PATH
echo "PATH=$PATH:/vagrant/node_modules/.bin" >> /home/vagrant/.bashrc
PATH=$PATH:/vagrant/node_modules/.bin

echo "Done installing node.js!"
