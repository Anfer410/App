#!/bin/bash
array=( alexa richard emma ela john )
for i in "${array[@]}"
do
	curl --data "name=$i&email=$i@example.com"  http://localhost:3000/users
done

