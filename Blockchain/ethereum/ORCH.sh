
# Send reservation for remote nodes
for host in `cat REMOTEHOST`; do
 #Copy reservation script to remote node
 scp xp-bootstrap washbair@$host
 nohup ssh washbair@$host "ruby xp-bootstrap --reserve" /dev/null 2>&1 &
 done
end
