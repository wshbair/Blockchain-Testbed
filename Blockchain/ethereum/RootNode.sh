oarsub -I -l nodes=1,walltime=3:00 -t deploy
kadeploy3 -f $OAR_NODE_FILE -e ubuntu1404-x64-min -k

sudo apt-get update
sudo apt-get -y install python-software-properties
sudo apt-get install -y software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install -y ethereum

geth --identity "LuxBch" --rpc --rpcport "8084" --rpccorsdomain "*" --datadir "/home/luxbch/data" --port "30303" --nodiscover --rpcapi "db,eth,net,web3" --networkid 3576 --nat "any" init "CustomGenesis.json"
