#!/bin/bash
#Set Genensis File
ETH_DATA='/root/Blockchain-Testbed/Blockchain/ethereum/'
geth --datadir="/root/luxbch/data" init $ETH_DATA"CommonGenesis.json"
geth --datadir="/root/luxbch/data" --password <(echo -n "") account new
