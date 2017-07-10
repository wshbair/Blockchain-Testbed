#!/bin/bash
# Start mining
nohup geth --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30313" --nodiscover --networkid 3576 --nat "any" --unlock 0 --password<(echo -n "") --mine --minerthreads=8 > /dev/null 2>&1 &
