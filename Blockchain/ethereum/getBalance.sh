
#!/bin/bash
geth --datadir="/home/luxbch/data" --nodiscover --rpc --rpcport "8084" --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --gasprice 0 --networkid 3576 js <(echo 'console.log(web3.fromWei(eth.getBalance(eth.coinbase), "ether"));') 2>/dev/null
