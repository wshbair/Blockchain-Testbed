filename="nodes.txt"
echo 'Transfering static-nodes to network nodes'
for host in `cat $filename`; do
    ssh  root@$host  killall -KILL geth
    scp -oStrictHostKeyChecking=no "static-nodes.json" root@$host:/home/luxbch/data #2> /dev/null 2>&1 &
    ssh  root@$host Blockchain-Testbed/Blockchain/ethereum/mining.sh 2> /dev/null 2>&1 &
    echo done node $host
done
#echo "All nodes ready and run in mining mode"
