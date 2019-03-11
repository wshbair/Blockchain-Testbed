
#!/bin/bash
#geth --datadir="/home/luxbch/data" --nodiscover --rpc --rpcport "8084" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --gasprice 0 --networkid 3576 js <(echo 'console.log(net.peerCount);') 2>/dev/null
function jsonval {
temp=`echo $json | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $prop`
    echo ${temp##*|}
}

json=`curl -H "Content-Type: application/json" --silent --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}' localhost:8084`
prop='result'
count =`jsonval`
 echo $count 
