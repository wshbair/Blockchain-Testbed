mkdir /root/new-node-1t
cd /root/new-node-1t
cat <(echo "yes") | java -jar /root/tessera.jar -keygen -filename /root/new-node-1t/new-node-1
cd /root/Blockchain-Testbed/Blockchain/ethereum
java -jar /root/tessera.jar -configfile config.json >> tessera.log 2>&1
