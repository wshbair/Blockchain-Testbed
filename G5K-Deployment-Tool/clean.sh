#!/bin/bash
#arg nnodes
filename="nodes.txt"
ETH_DATA="/home/luxbch/data"
for host in `cat $filename`; do
     echo Killing on $host
     ssh  -oStrictHostKeyChecking=no root@$host killall -KILL geth
     rm -rf $ETH_DATA
     echo done node $host
done
echo "All nodes are cleaned"
echo "--------------------------------------------"
echo "Reinilize nodes"
echo "The gensis file: CommonGenesis_"$1".json"
for host in `cat $filename`; do
 ssh -oStrictHostKeyChecking=no root@$host /init.sh $1
done



