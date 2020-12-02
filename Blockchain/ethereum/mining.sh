#!/bin/bash
# Start mining
#nohup geth --syncmode "full" --miner.etherbase 0 --allow-insecure-unlock --datadir="/root/luxbch/data" --nodiscover --rpc --rpcport "8084" --rpccorsdomain "*" --rpcapi "admin,eth,debug,miner,net,txpool,personal,web3" --gasprice 0 --maxpeers 32 --networkid 3576 --unlock 0 --password <(echo -n "") --mine --minerthreads 8 2> /dev/null 2>&1 &
PRIVATE_CONFIG=/root/new-node-1t/tm.ipc nohup /root/quorum/build/bin/geth --datadir /root/new-node --nodiscover --verbosity 5 --networkid 31337 --raft --raftport 50000 --rpc --rpcaddr 0.0.0.0 --rpcport 22000 --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum,raft --emitcheckpoints --port 21000 >> node.log 2>&1 &
