#!/bin/bash
# run on the root node to generate static-nodes.json file
ip_addr=`ifconfig eth0 2>/dev/null|awk '/inet addr:/ {print $2}'|sed 's/addr://'`
geth --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30303" --nodiscover --networkid 3576 --nat "any" --password <(echo -n "") account new
#echo "["`geth --datadir=/home/luxbch/data --rpc --rpcaddr 0.0.0.0 --rpcport "8084" --rpccorsdomain "*" --gasprice 0 --networkid 3576 --unlock 0 --password <(echo -n "") js <(echo 'console.log(admin.nodeInfo.enode);') 2>/dev/null |grep enode | perl -pe "s/\[\:\:\]/$ip_addr/g" | perl -pe "s/^/\"/; s/\s*$/\"/;"`"]">>static-node.json
echo "["`geth --datadir=/home/luxbch/data --rpc --rpcaddr 0.0.0.0 --rpcport "8084" --rpccorsdomain "*" --gasprice 0 --networkid 3576 --unlock 0 --password <(echo -n "") js <(echo 'console.log(admin.nodeInfo.enode);') 2>/dev/null |grep enode | perl -pe "s/\[\:\:\]/$ip_addr/g" | perl -pe "s/^/\"/; s/\s*$/\"/;"`"]"
