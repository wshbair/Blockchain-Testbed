
#!/bin/bash
geth --datadir=/home/luxbch/data --rpc --rpcaddr 0.0.0.0 --rpcport "8084" --rpccorsdomain "*" --gasprice 0 --networkid 3576 js <(echo 'console.log(net.peerCount);') 2>/dev/null
