#!/bin/bash
#Open Console window
#nohup geth --identity "LuxBch" --nodiscover --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30303" --unlock 0 --password <(echo -n "") --rpcapi "db,eth,net,web3, personal" --networkid 3576 --nat "none" 2> /dev/null 2>&1 &
#nohup geth --datadir="/home/luxbch/data" --nodiscover --rpc --rpcport "8084" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --gasprice 0 --maxpeers 32 --networkid 3576 --unlock 0 --password <(echo -n "") 2> /dev/null 2>&1 &
nohup geth --allow-insecure-unlock --datadir="/home/luxbch/data" --rpc --rpcport "8084" --rpccorsdomain "*" --rpcapi "admin,eth,debug,miner,net,txpool,personal,web3" --gasprice 0 --maxpeers 32 --networkid 3576 --unlock 0 --password <(echo -n "") 2> /dev/null 2>&1 &
