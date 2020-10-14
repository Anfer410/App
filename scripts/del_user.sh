#!/bin/bash
array=( 1 2 3 4 5 6 7 8 9 10 )
for i in "${array[@]}"
do
 curl -X "DELETE" http://localhost:3000/users/$i
done