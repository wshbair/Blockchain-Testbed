#!/bin/bash
# run on the root node to generate static-nodes.json file
# old ubuntu 14
#ip_addr=`ifconfig eth0 2>/dev/null|awk '/inet addr:/ {print $2}'|sed 's/addr://'`
ip_addr=`ip -4 addr show eno1 | grep -oP "(?<=inet ).*(?=/)"`
if [ -z "$ip_addr" ]
 then
  ip_addr=`ip -4 addr show eno2 | grep -oP "(?<=inet ).*(?=/)"`
fi

# old version of geth
#geth --datadir=/home/luxbch/data --rpc --rpcaddr 0.0.0.0 --rpcport "8084" --rpccorsdomain "*" --gasprice 0 --networkid 3576 js <(echo 'console.log(admin.nodeInfo.enode);') 2>/dev/null |grep enode | perl -pe "s/\[\:\:\]/$ip_addr/g" | perl -pe "s/^/\"/; s/\s*$/\"/;"
geth --datadir=/home/luxbch/data --rpc --rpcaddr 0.0.0.0 --rpcport "8084" --rpccorsdomain "*" --gasprice 0 --networkid 3576 js <(echo 'console.log(admin.nodeInfo.enode);') 2>/dev/null |grep enode | perl -pe "s/127\.0\.0\.1/$ip_addr/g" | perl -pe "s/^/\"/; s/\s*$/\"/;"
 
