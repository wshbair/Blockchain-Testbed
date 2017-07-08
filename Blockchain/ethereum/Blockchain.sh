#GRID5000 stuff
#!/bin/bash

function join { local IFS="$1"; shift; echo "$*"; }

array=()
for host in `cat REMOTEHOST`; do
 echo $host
 remotenodes=`ssh washbair@$host 'cat nodes.txt'`
 echo $remotenodes
  for node in $remotenodes; do
   echo $node$'\r'>>nodes.txt
   done
 x=`ssh washbair@$host 'cat static-nodes.json'`
 array+=($x)
 done
 z=` join , ${array[@]}`

 localstnode=`cat static-nodes.json`
 echo '['$localstnode$','$z$']'>static-nodes.json

#filename="nodes.txt"
#while read -r line
#do
#    scp "static-nodes.json" root@$line:/home/luxbch/data
#done < $filename

#for host in `cat $filename`; do
#    ssh  root@$host  pkill geth
#    ssh  root@$host  Blockchain-Testbed/Blockchain/ethereum/mining.sh 2> /dev/null 2>&1 &
#    echo done node $host
#done
