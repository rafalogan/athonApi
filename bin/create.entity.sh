#!/bin/zsh

DIR_REPOSITORIES="./src/repositories"
DIR_ENTITIES="$DIR_REPOSITORIES/entities"

if [ ! -d "$DIR_REPOSITORIES" ]; then
		mkdir DIR_REPOSITORIES
fi

if [ ! -d "$DIR_ENTITIES" ]; then
		mkdir DIR_ENTITIES &&
		touch "$DIR_ENTITIES/index.ts"
fi

if [ ! -f "$DIR_ENTITIES/index.ts" ]; then
    touch "$DIR_ENTITIES/index.ts"
fi

touch "$DIR_ENTITIES/$1.entity.ts"

echo "export * from './$1.entity';" >> "$DIR_ENTITIES/index.ts"
echo "Entity file $1 is created"
