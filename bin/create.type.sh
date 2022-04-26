#!/bin/zsh

DIR_REPOSITORIES="./src/repositories"
DIR_ENTITIES="$DIR_REPOSITORIES/types"

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

touch "$DIR_ENTITIES/$1.ts"

echo "export * from './$1';" >> "$DIR_ENTITIES/index.ts"
echo "Type file $1 is created"
