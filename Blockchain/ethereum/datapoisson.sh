#!/bin/bash
p=$(python poisson.py)
echo $p
for i in $p;
do
  sleep i
  n=0              
  j=$(source test5000)
  echo $j>>outputtest.txt
done
echo $TIMESTAMP| perl -nE 'say scalar localtime $_' >>outputtest.txt
#python plotgraph.py
