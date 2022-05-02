#!/bin/zsh

ROOT_DIR="./src"
DIR_SERVICES="$ROOT_DIR/services"
DIR_SERVICES_MODULES="$ROOT_DIR/modules"

if [ ! -d "$DIR_SERVICES_MODULES/$1" ]; then
    mkdir "$DIR_SERVICES" &&
    touch "$DIR_SERVICES/index.ts" &&
    touch "$DIR_SERVICES/services.module.ts" &&
    touch "$DIR_SERVICES/$1.service.ts" &&
    echo "export * from './$1.service';" >> "$DIR_SERVICES/index.ts"

else
	touch "$DIR_SERVICES_MODULES/$1/$1.service.ts" &&
	echo "export * from './$1.service';" >> "$DIR_SERVICES_DIR_SERVICES_MODULES/$1/index.ts"
fi

echo "Service file $1 is created"
