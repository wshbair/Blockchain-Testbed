Cleaning
echo "Cleaning"
rm nodes.txt static-nodes.json OAR* oar*
echo "Reservation"
#ruby Bch-Over-G5k
ruby G5KNodeReservation.rb $1 $2
#clear
filename="nodes.txt"
echo 'Transfering static-nodes to network nodes'
for host in `cat $filename`; do
    ssh  root@$host  killall -KILL geth
    scp -oStrictHostKeyChecking=no "static-nodes.json" root@$host:/home/luxbch/data #2> /dev/null 2>&1 &
done
echo "Blockchain Testbed is ready"
