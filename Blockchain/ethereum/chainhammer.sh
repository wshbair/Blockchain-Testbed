cd chainhammer
scripts/install.sh nodocker

git reset HEAD hammer/config.py
git checkout -- hammer/config.py
head -n 20 hammer/config.py

sed -i "s/RPCaddress='http:\/\/localhost:8545'/RPCaddress='http:\/\/localhost:8084'/g" hammer/config.py
sed -i "s/RPCaddress2='http:\/\/localhost:8545'/RPCaddress2='http:\/\/localhost:8084'/g" hammer/config.py
head -n 20 hammer/config.py
CH_TXS=15000 CH_THREADING="threaded2 300" ./run.sh "BlockZoom: expriment 1"
