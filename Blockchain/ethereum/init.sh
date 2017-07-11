#!/bin/bash
#Set Genensis File
nohup geth --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30303" --nodiscover --networkid 3576 --nat "none" init "CommonGenesis.json" > /dev/null 2>&1 &
