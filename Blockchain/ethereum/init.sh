#!/bin/bash
#Set Genensis File
#ETH_DATA='Blockchain-Testbed/Blockchain/ethereum/Gensises/CommonGenesis'
rm -fr /home/luxbch/data/geth
nohup geth --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30303" --nodiscover --networkid 3576 --nat "none" init "CommonGenesis.json" 2> /dev/null 2>&1 &
#nohup geth --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30303" --nodiscover --networkid 3576 --nat "none" init $ETH_DATA"_"$1".json" 2> /dev/null 2>&1 &
nohup geth --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30303" --nodiscover --networkid 3576 --nat "none" --password <(echo -n "") account new 2> /dev/null 2>&1 &

