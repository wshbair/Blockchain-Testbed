#!/bin/bash
clear
filename="nodes.txt"

# Set mining node
nodes = `cat $filename`
for (( i=0; i<=$1; i++ ))
 echo Mining on $nodes[i]
 nohup ssh  root@$nodes[i]  Blockchain-Testbed/Blockchain/ethereum/mining.sh 2> /dev/null 2>&1 &
do  
done

#Set Client nodes
for (( i=0; i<=$2; i++ ))
      echo CPUheavy on $nodes[i]
      ssh  root@$nodes[i]  nodejs Blockchain-Testbed/Blockchain/ethereum/cpuheavy.js 10 777
do  
done
