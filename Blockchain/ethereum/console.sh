#!/bin/bash
#Open Console window
nohup geth --identity "LuxBch" --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30303" --rpcapi "db,eth,net,web3, personal" --networkid 3576 --nat "none" console > /dev/null 2>&1 &
