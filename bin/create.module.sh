#!/bin/zsh

DIR_MODULES="./src/api"
DIR_CONTROLLERS="./src/api/controllers"
DIR_ROUTES="./src/api/routes"

if [ ! -d "$DIR_MODULES" ]; then
	mkdir "$DIR_MODULES" && mkdir "$DIR_CONTROLLERS" && mkdir "$DIR_ROUTES"
fi

if [! -f "$DIR_MODULES/api.module.ts" ]; then
	touch "$DIR_MODULES/api.module.ts"
fi

if [ ! -f "$DIR_CONTROLLERS/controllers.module.ts" ]; then
    touch "$DIR_CONTROLLERS/controllers.module.ts" &&
    touch "$DIR_CONTROLLERS/index.ts"
fi

if [ ! -f "$DIR_ROUTES/routes.module.ts" ]; then
		touch "$DIR_ROUTES/routes.module.ts" &&
		touch "$DIR_ROUTES/index.ts"
fi

touch "$DIR_CONTROLLERS/$1.controller.ts" &&
touch "$DIR_ROUTES/$1.routes.ts" &&

echo "export * from './$1.controller';" >> "$DIR_CONTROLLERS/index.ts"
echo "export * from './$1.routes';" >> "$DIR_DIR_ROUTES/index.ts"

echo "Module Files $1 Created with Success!"
