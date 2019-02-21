
#!/bin/bash
geth --datadir=/home/luxbch/data --rpc --rpcaddr 0.0.0.0 --rpcport "8084" --rpccorsdomain "*" --gasprice 0 --networkid 3576 js <(echo 'console.log(eth.getBalance(eth.coinbase));') 2>/dev/null
