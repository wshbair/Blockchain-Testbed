#!/bin/bash
# Start mining
#nohup geth --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30313" --nodiscover --networkid 3576 --nat "none" --password <(echo -n "") account new 2> /dev/null 2>&1 &
#nohup geth --rpc --rpcport "8084" --rpccorsdomain "*" --rpcapi "db,eth,net,web3, personal" --datadir "/home/luxbch/data" --port "30303" --nodiscover --networkid 3576 --nat "none" --unlock 0 --password <(echo -n "") --mine --minerthreads 8 2> /dev/null 2>&1 &
#nohup geth --datadir="/home/luxbch/data" --nodiscover --rpc --rpcport "8084" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --gasprice 0 --maxpeers 32 --networkid 3576 --unlock 0 --password <(echo -n "") --mine --minerthreads 8 2> /dev/null 2>&1 &


function jsonval {
temp=`echo $json | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $prop`
    echo ${temp##*|}
}

json=`curl -H "Content-Type: application/json" --silent --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}' localhost:8084`
prop='result'
picurl=`jsonval`

json=`curl -H "Content-Type: application/json" --silent --data '{"jsonrpc":"2.0","method":"miner_setEtherbase","params":["'$picurl'", "latest"],"id":1}' localhost:8084`

nohup geth --syncmode "full" --allow-insecure-unlock --datadir="/home/luxbch/data" --nodiscover --rpc --rpcport "8084" --rpccorsdomain "*" --rpcapi "admin,eth,debug,miner,net,txpool,personal,web3" --gasprice 0 --maxpeers 32 --networkid 3576 --unlock 0 --password <(echo -n "") --mine --minerthreads 8 2> /dev/null 2>&1 &
