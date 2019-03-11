function jsonval {
temp=`echo $json | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $prop`
    echo ${temp##*|}
}
json=`curl -H "Content-Type: application/json" --silent --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}' localhost:8084`
prop='result'
flag=`jsonval`
echo $flag
