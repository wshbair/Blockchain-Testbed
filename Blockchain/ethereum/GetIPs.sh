
!/bin/bash
#arg nnodes
filename="nodes.txt"

for host in `cat $filename`; do
     ssh  -oStrictHostKeyChecking=no root@$host ifconfig eth0 2>/dev/null|awk '/inet addr:/ {print $2}'|sed 's/addr://'
done
