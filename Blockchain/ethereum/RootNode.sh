oarsub -I -l nodes=1,walltime=3:00 -t deploy
kadeploy3 -f $OAR_NODE_FILE -e ubuntu1404-x64-min -k

sudo apt-get update
sudo apt-get -y install python-software-properties
sudo apt-get install -y software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install -y ethereum

init.sh

