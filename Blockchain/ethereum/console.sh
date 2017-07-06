#!/bin/bash
#Open Console window
nohup geth --identity "LuxBch" --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30303" --rpcapi "db,eth,net,web3" --networkid 3576 --nat "any"  console
