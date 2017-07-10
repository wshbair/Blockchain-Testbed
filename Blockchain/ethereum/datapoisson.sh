#!/bin/bash
input="/home/sedan/outputtest.txt"       
#date -d @1278999698 +'%Y-%m-%d %H:%M:%S' 
#TIMESTAMP=1497705626
#for i in `seq 1 3`;

p=$(python poisson.py)
echo $p
for i in $p;
    do
        #sleep $i
        sleep 2
        n=0
        for((l=1;l<=$i;l++));
        do
                
               ((n+=1))
                #echo -n $i >>outputtest.txt
               j=$(source test5000)
               echo $j>>outputtest.txt


       done
    done


 

#echo $TIMESTAMP| perl -nE 'say scalar localtime $_' >>outputtest.txt
python plotgraph.py
while IFS= read -a arr
do
  
  echo "${arr[1]}"| perl -nE 'say scalar localtime $_' >>plotdata.txt
  
done < "$input"

