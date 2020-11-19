#!/bin/bash
# run on the root node to generate static-nodes.json file
ip_addr=`ip -4 addr show eno1 | grep -oP "(?<=inet ).*(?=/)"`
if [ -z "$ip_addr" ]
 then
  ip_addr=`ip -4 addr show eno2 | grep -oP "(?<=inet ).*(?=/)"`
fi

nohup geth --datadir new-node account new --password <(echo -n "") 2>/dev/null
bootnode --genkey=nodekey
cp nodekey new-node

bootnode --nodekey=new-node/nodekey --writeaddress > new-node/enode
enode=`cat new-node/enode`
port="@$ip_addr?discport=0&raftport=50000"
echo $enode$port
