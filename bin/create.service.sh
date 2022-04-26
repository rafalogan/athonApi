#!/bin/zsh

DIR_SERVICES="./src/services"

if [ ! -d "$DIR_SERVICES" ]; then
    mkdir "$DIR_SERVICES"
fi

if [ ! -f "$DIR_SERVICES/index.ts" ]; then
		touch "$DIR_SERVICES/index.ts"
fi

if [ ! -f "$DIR_SERVICES/services.module.ts" ]; then
    touch "$DIR_SERVICES/services.module.ts" &&
		echo "export * from './services.module';" >> "$DIR_SERVICES/index.ts" &&
		echo "export class ServicesModule {}" >> "$DIR_SERVICES/services.module.ts"
fi

touch "$DIR_SERVICES/$1.service.ts"

echo "export * from './$1.service';" >> "$DIR_SERVICES/index.ts"
echo "Service file $1 is created"
