mkdir new-node-1t
cd new-node-1t
java -jar /root/tessera.jar -keygen -filename new-node-1
java -jar /root/tessera.jar -configfile config.json >> tessera.log 2>&1 &
