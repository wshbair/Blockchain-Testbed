#!/bin/bash
#Open Console window
nohup geth --syncmode "full" --allow-insecure-unlock --datadir="/root/luxbch/data" --nodiscover --rpc --rpcport "8084" --rpccorsdomain "*" --rpcapi "admin,eth,debug,miner,net,txpool,personal,web3" --gasprice 0 --maxpeers 32 --networkid 3576 --unlock 0 --password <(echo -n "") 2> /dev/null 2>&1 &
