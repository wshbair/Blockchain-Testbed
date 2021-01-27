#!/bin/bash
# installing ethereum and docker
# Ubuntu version 
#sudo apt-get update
#sudo apt-get -y install python-software-properties
#sudo apt-get install -y software-properties-common
#sudo add-apt-repository -y ppa:ethereum/ethereum
#sudo apt-get update
#sudo apt-get install -y ethereum

#Debian version 
#GETH_VERSION=v1.9.6
#go get -d -u github.com/ethereum/go-ethereum
#OLDPATH=$(pwd)
#cd $GOPATH/src/github.com/ethereum/go-ethereum/
#git checkout $GETH_VERSION
#cd $OLDPATH
#rm -f $(which geth)
#go clean -r "github.com/ethereum/go-ethereum/cmd/geth"
#go install  "github.com/ethereum/go-ethereum/cmd/geth"

# Install GoQuorum
sudo apt-get install golang-go -y
#git clone https://github.com/ConsenSys/quorum.git does not work with current setting 27/01
#Get older version 
wget https://github.com/ConsenSys/quorum/archive/v2.7.0.tar.gz
tar -zxvf v2.7.0.tar.gz
mv quorum-2.7.0 quorum
cd quorum
make all

#PATH=$(pwd)/build/bin:$PATH
#source /etc/environment && export PATH

cd ..

#Install Tessera
wget https://oss.sonatype.org/service/local/repositories/releases/content/net/consensys/quorum/tessera/tessera-app/20.10.0/tessera-app-20.10.0-app.jar
mv tessera-app-20.10.0-app.jar tessera.jar
sudo apt-get install default-jre -y

#Utility Tools
#sudo apt-get install -y git
sudo apt-get install -y python-numpy
sudo apt-get install -y nano
sudo apt-get install -y npm
npm install web3@0.19
npm install solc
npm install file-system --save
sudo apt-get install -y curl
sudo apt-get install -y libcurl4-openssl-dev
#install chainhammar
git clone https://github.com/wshbair/chainhammer.git
cd chainhammer
scripts/install.sh nodocker

git reset HEAD hammer/config.py
git checkout -- hammer/config.py
head -n 20 hammer/config.py

#sed -i "s/RPCaddress='http:\/\/localhost:8545'/RPCaddress='http:\/\/localhost:8084'/g" hammer/config.py
#sed -i "s/RPCaddress2='http:\/\/localhost:8545'/RPCaddress2='http:\/\/localhost:8084'/g" hammer/config.py

sed -i "s/RPCaddress='http:\/\/localhost:8545'/RPCaddress='http:\/\/localhost:22000'/g" hammer/config.py
sed -i "s/RPCaddress2='http:\/\/localhost:8545'/RPCaddress2='http:\/\/localhost:22000'/g" hammer/config.py
head -n 20 hammer/config.py
