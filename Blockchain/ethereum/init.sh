#!/bin/bash
#Create User
nohup geth --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30303" --nodiscover --networkid 3576 --nat "any" --password <(echo -n "") account new > /dev/null 2>&1 &
#Set Genensis File
nohup geth --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30303" --nodiscover --networkid 3576 --nat "any" init "CommonGenesis.json" > /dev/null 2>&1 &
