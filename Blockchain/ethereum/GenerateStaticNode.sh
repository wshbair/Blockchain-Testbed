#!/bin/bash
# run on the root node to generate static-nodes.json file
ip_addr=`ip -4 addr show eno1 | grep -oP "(?<=inet ).*(?=/)"`
if [ -z "$ip_addr" ]
 then
  ip_addr=`ip -4 addr show eno2 | grep -oP "(?<=inet ).*(?=/)"`
fi

nohup /root/quorum/build/bin/geth --datadir new-node account new --password <(echo -n "") >/dev/null 2>&1
/root/quorum/build/bin/bootnode --genkey=nodekey
cp nodekey new-node

/root/quorum/build/bin/bootnode --nodekey=new-node/nodekey --writeaddress > new-node/enode
enode=`cat new-node/enode`
ipaddress= "@$ip_addr?"
port=$ipaddress":21000discport=0&raftport=50000"
echo '"enode://$enode$port"'
