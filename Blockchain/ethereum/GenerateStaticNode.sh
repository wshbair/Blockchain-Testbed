
#!/bin/bash
# run on the root node to generate static-nodes.json file
#ip_addr=`ip -4 addr show eno1 | grep -oP "(?<=inet ).*(?=/)"`
ip_addr=`hostname -I`
ip=`echo $ip_addr | sed -e 's/^[[:space:]]*//'`

nohup /root/quorum/build/bin/geth --datadir new-node account new --password <(echo -n "") >/dev/null 2>&1
/root/quorum/build/bin/bootnode --genkey=nodekey
cp nodekey new-node

/root/quorum/build/bin/bootnode --nodekey=new-node/nodekey --writeaddress > new-node/enode
enode=`cat new-node/enode`

port="@$ip:21000?discport=0&raftport=50000"
printf \"enode://$enode$port\"
