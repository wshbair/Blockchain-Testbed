#!/bin/bash
# run on the root node to generate static-nodes.json file
ip_addr=`ip -4 addr show eno1 | grep -oP "(?<=inet ).*(?=/)"`
if [ -z "$ip_addr" ]
 then
  ip_addr=`ip -4 addr show eno2 | grep -oP "(?<=inet ).*(?=/)"`
fi

geth --datadir new-node account new
bootnode --genkey=nodekey
cp nodekey new-node

bootnode --nodekey=new-node/nodekey --writeaddress > new-node/enode
enode =`cat new-node/enod`
port ="@$ip_addr?discport=0&raftport=50000""
echo $enode$port

#geth --datadir=/root/luxbch/data --rpc --rpcaddr 0.0.0.0 --rpcport "8084" --rpccorsdomain "*" --gasprice 0 --networkid 3576 js <(echo 'console.log(admin.nodeInfo.enode);') 2>/dev/null |grep enode | perl -pe "s/127\.0\.0\.1/$ip_addr/g" | perl -pe "s/^/\"/; s/\s*$/\"/;"
 
