#!/bin/bash
# Start mining
geth --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30313" --nodiscover --networkid 3576 --nat "any" --mine --minerthreads=8
