#!/bin/zsh
DIR_MODULES="./src/modules"

read module

if [ ! -d "$DIR_MODULES" ]; then
	mkdir "$DIR_MODULES"
fi

PATH_MODULE="./src/modules/$module"

mkdir "$PATH_MODULE" &&
mkdir "$PATH_MODULE/types" &&
touch "$PATH_MODULE/types/$module.ts" &&
touch "$PATH_MODULE/$module.module.ts" &&
touch "$PATH_MODULE/$module.controller.ts" &&
touch "$PATH_MODULE/$module.router.ts" &&

echo "Module $module Created with Success!"
