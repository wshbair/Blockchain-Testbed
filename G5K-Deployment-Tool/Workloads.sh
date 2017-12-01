clear
filename="nodes.txt"
#echo 'Transfering static-nodes to network nodes'
#for host in `cat $filename`; do
#    ssh  root@$host  pkill geth
#    sleep 5
#   scp -oStrictHostKeyChecking=no "static-nodes.json" root@$host:/home/luxbch/data #2> /dev/null 2>&1 &
#    nohup ssh  root@$host  Blockchain-Testbed/Blockchain/ethereum/mining.sh 2> /dev/null 2>&1 &
#done
#sleep 60
#echo "SlEEPING 60sec to make node have some Ethers for next Workloads transactions"

echo "All nodes ready and run in mining mode"
echo "------------------------------------------------------"
echo "Blockchain Workload #1"
for host in `cat $filename`; do
     echo CPUheavy on $host
     ssh  root@$host  nodejs Blockchain-Testbed/Blockchain/ethereum/cpuheavy.js 10 777
done
echo "------------------------------------------------------"
echo "Blockchain Workload #2"
for host in `cat $filename`; do
     echo IOHeavy on $host
     ssh  root@$host  nodejs Blockchain-Testbed/Blockchain/ethereum/ioheavy/deploy.js
     contractAddress=$(ssh  root@$host  nodejs Blockchain-Testbed/Blockchain/ethereum/ioheavy/deploy.js 2>&1)
     echo $contractAddress
     echo $contractAddress
     ssh  root@$host  nodejs Blockchain-Testbed/Blockchain/ethereum/ioheavy/write.js 10 10 111 $contractAddress
     ssh  root@$host  nodejs Blockchain-Testbed/Blockchain/ethereum/ioheavy/scan.js 10 10 111 $contractAddress
     echo "******"

done
echo "------------------------------------------------------"
