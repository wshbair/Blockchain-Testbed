#!/bin/bash
# Start mining
geth --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30303" --nodiscover --networkid 3576 --nat "none" --password <(echo -n "") account new
geth --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30313" --nodiscover --networkid 3576 --nat "none" --unlock 0 --password <(echo -n "") --mine --minerthreads=8
