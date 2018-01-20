#!/usr/bin/ruby -w
require 'cute'
g5k = Cute::G5K::API.new()

time='1:00:00'
nodes_number=2
nodes=""
sites = g5k.site_uids
job = {}
sites.each do |site|
  job = g5k.reserve(:nodes => nodes_number, :site => site, :walltime => time, :wait => false, :env => 'ubuntu1404-x64-min', :type => :deploy)
  begin
    job = g5k.wait_for_job(job, :wait_time => 60)
    x=job['assigned_nodes']
    nodes=nodes+x
  rescue  Cute::G5K::EventTimeout
    puts "We waited too long in site #{site} let's release the job and try in another site"
    g5k.release(job)
  end
end

puts "All nodes are reserved"
puts nodes

# Save Nodes names
File.open("nodes.txt", "w+") do |f|
  f.puts(nodes)
end

output = File.open( "static-nodes.json","w" )
nodeslink=[]
puts "Running commands"

ssh = Net::SSH::Multi::Session::new
nodes.each { |n| ssh.use "root@#{n}" }
 ssh.exec!("sudo apt-get update")
 ssh.exec!("sudo apt-get install -y git")
 ssh.exec!("git clone https://github.com/snt-sedan/Blockchain-Testbed.git") #Download needed software
 ssh.exec!("chmod u+x Blockchain-Testbed/Blockchain/ethereum/*.sh") #make the script executable
 ssh.exec!("Blockchain-Testbed/Blockchain/ethereum/install.sh")
 ssh.exec!("Blockchain-Testbed/Blockchain/ethereum/init.sh")#creat a user and run Gensis command

puts "Generate static node address"
# We needd to get the address of the static node
output = File.open( "static-nodes.json","w" )
nodeslink=[]
for @hostname in nodes
  @username = "root"
  @password = ""
  @cmd = "Blockchain-Testbed/Blockchain/ethereum/GenerateStaticNode.sh"
  ssh = Net::SSH.start(@hostname, @username, :password => @password)
  res = ssh.exec!(@cmd)
  nodeslink.push(res)
  ssh.close
end
output<<'[ '+nodeslink.join(',')+' ]'
output.close
puts "Experiment preparation finished."
