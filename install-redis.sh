## Redis-server installation (https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis)
echo "Downloading redis..."
sudo apt-get install -y tcl
sudo wget http://download.redis.io/releases/redis-3.0.6.tar.gz
tar xzf redis-3.0.6.tar.gz
cd redis-3.0.6
make

echo "Installing redis..."
sudo make install
cd utils
sudo ./install_server.sh

echo "Done - Redis is installed!"
