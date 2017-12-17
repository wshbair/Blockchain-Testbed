#!/bin/bash
#arg nnodes
filename="nodes.txt"

for host in `cat $filename`; do
     echo Killing on $host
     ssh  -oStrictHostKeyChecking=no root@$host killall -KILL geth
     echo done node $host
done
