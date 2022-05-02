#!/bin/zsh

DIR_MODULES="./src/modules"


if [ ! -d "$DIR_MODULES" ]; then
	mkdir "$DIR_MODULES" &&
	mkdir "$DIR_MODULES/$1"
else
	mkdir "$DIR_MODULES/$1"
fi

touch "$DIR_MODULES/$1/$1.module.ts" &&
touch "$DIR_MODULES/$1/$1.controller.ts" &&
touch "$DIR_MODULES/$1/$1.routes.ts" &&
touch "$DIR_MODULES/$1/$1.service.ts" &&
touch "$DIR_MODULES/$1/index.ts" &&

echo "
export * from './$1.module';
export * from './$1.controller';
export * from './$1.routes';
export * from './$1.service';
" >> "$DIR_MODULES/$1/index.ts"

echo "Module $1 Created with Success!"
