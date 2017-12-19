#!/bin/bash
# installing ethereum and docker
sudo apt-get update
sudo apt-get -y install python-software-properties
sudo apt-get install -y software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install -y ethereum
sudo apt-get install -y git
sudo apt-get install -y python-numpy
sudo apt-get install -y nano
sudo apt-get install -y npm
npm install web3@0.19
npm install poisson-process
npm install solc
npm install file-system --save
