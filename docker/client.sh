#!/bin/bash
HOST='watchdog-api:3333'

echo $HOST

while true
    do
        NUMB=`expr $RANDOM % 100 + 1`
        TEMP=`awk -v seed="$RANDOM" 'BEGIN { srand(seed); printf("%.4f\n", rand()) }'`

        if [ $NUMB -le 30 ]; then
            curl --location "http://${HOST}/"
        elif [ $NUMB -ge 31 ] && [ $NUMB -le 60 ]; then
            curl --location "http://${HOST}/" \
                 --header 'Content-Type: application/json' \
                 --data "{\"teste\": $RANDOM}"
        elif [ $NUMB -ge 61 ] && [ $NUMB -le 75 ]; then 
            curl --location "http://${HOST}/session" \
                 --header 'Content-Type: application/json' \
                 --data '{"username": "teste","password": "teste"}'
        elif [ $NUMB -ge 76 ] && [ $NUMB -le 80 ]; then 
            curl --location "http://${HOST}/teste"
        elif [ $NUMB -ge 81 ] && [ $NUMB -le 85 ]; then 
            curl --location "http://${HOST}/latency"
        elif [ $NUMB -ge 86 ] && [ $NUMB -le 91 ]; then 
            curl --location --request POST "http://${HOST}/session"
        elif [ $NUMB -ge 92 ] && [ $NUMB -le 95 ]; then
            curl --location "http://${HOST}/" \
                 --header 'Content-Type: application/json' \
                 --data "{ "teste" : $RANDOM}"
        else
            curl --location --request POST "http://${HOST}/"
        fi

        sleep $TEMP
done