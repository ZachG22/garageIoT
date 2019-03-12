#!/bin/bash

# Common path to GPIO
BASE_GPIO_PATH=/sys/class/gpio

# Pin numbers
GARAGE_PIN=2

# STATES
ON="1"
OFF="0"

# Export a pin

exportPin()
{
	if [ ! -e $BASH_GPIO_PATH/gpio$1 ]; then
		echo "$1" > $BASE_GPIO_PATH/export
	fi
}

# Set pin as an output
setOutput()
{
	echo "$2" > $BASE_GPIO_PATH/gpio$1/direction
}

# Set pin state
setState()
{
	echo $2 > $BASE_GPIO_PATH/gpio$1/value
}

#Export Pins
exportPin $GARAGE_PIN

# Set pin output
setOutput $GARAGE_PIN out

sleep 2

setOutput $GARAGE_PIN in
