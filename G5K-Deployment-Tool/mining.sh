clear
filename="nodes.txt"
for host in `cat $filename`; do
   #ssh  root@$host  pkill geth
   #sleep 5
   #scp -oStrictHostKeyChecking=no "static-nodes.json" root@$host:/home/luxbch/data #2> /dev/null 2>&1 &
   nohup ssh  root@$host  Blockchain-Testbed/Blockchain/ethereum/mining.sh 2> /dev/null 2>&1 &
done
echo "SlEEPING 100sec to make node have some Ethers for next Workloads transactions"
sleep 100
