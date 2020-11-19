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
git clone https://github.com/ConsenSys/quorum.git
cd quorum
make all

echo PATH=$PATH:/root/quorum/build/bin>>~/.bashrc
source ~/.bashrc
cd ..

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

sed -i "s/RPCaddress='http:\/\/localhost:8545'/RPCaddress='http:\/\/localhost:8084'/g" hammer/config.py
sed -i "s/RPCaddress2='http:\/\/localhost:8545'/RPCaddress2='http:\/\/localhost:8084'/g" hammer/config.py
head -n 20 hammer/config.py
