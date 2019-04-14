#!/bin/bash
#echo "Compile the workload generator"
CompileSmartContract()
{
cd Blockchain-Testbed/Blockchain/ethereum/smallbank 
 local v=$(make) 2> /dev/null 2>&1 &
 chmod u+x Loads.sh
echo "Done"
}
CompileSmartContract
