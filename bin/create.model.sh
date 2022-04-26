#!/bin/zsh

DIR_REPOSITORIES="./src/repositories"
DIR_ENTITIES="$DIR_REPOSITORIES/models"

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

touch "$DIR_ENTITIES/$1.model.ts"

echo "export * from './$1.model';" >> "$DIR_ENTITIES/index.ts"
echo "Model file $1 is created"
