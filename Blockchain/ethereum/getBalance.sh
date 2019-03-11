
#!/bin/bash
#geth --datadir="/home/luxbch/data" --nodiscover --rpc --rpcport "8084" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --gasprice 0 --networkid 3576 js <(echo 'console.log(web3.fromWei(eth.getBalance(eth.coinbase), "ether"));') 2>/dev/null
function jsonval {
temp=`echo $json | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $prop`
    echo ${temp##*|}
}

json=`curl -H "Content-Type: application/json" --silent --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}' localhost:8084`
prop='result'
picurl=`jsonval`

json=`curl -H "Content-Type: application/json" --silent --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["'$picurl'", "latest"],"id":1}' localhost:8084`
balance=`jsonval`
echo $balance
