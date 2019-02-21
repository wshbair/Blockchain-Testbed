
#!/bin/bash
geth --datadir="/home/luxbch/data" --nodiscover --rpc --rpcport "8084" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --gasprice 0 --networkid 3576 js <(echo 'console.log(net.peerCount);') 2>/dev/null
