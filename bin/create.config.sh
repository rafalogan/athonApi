#!/bin/zsh

DIR_CONFIG="./src/config"

if [ ! -d "$DIR_CONFIG" ]; then
	mkdir "$DIR_CONFIG"
fi

touch "$DIR_CONFIG/$1.config.ts"
echo
