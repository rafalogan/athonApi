# Athon API #

New REST API Athon rewrite in [TypeScript](https://www.typescriptlang.org/docs/home.html).
To working with CMS

Versão: 2.0.0

> Default baseURL http://localhost:9000

#### Requires ####

* [NodeJS](https://nodejs.org/en/docs/)
* [TypeScript](https://www.typescriptlang.org/docs/home.html)
* [Docker](https://www.docker.com/products/docker-hub)

#### To run Developer environment ####

* Up database ```docker-composer up```
* Up Dev ```npm run dev```
* Test dist ```npm start```

#### Environment Variables ####

on Development environment need to create a file `.env` with then variables:
```.dotenv
# VARIABLES OF ENVIROMENT
# Enviroment
NODE_ENV=

# Data base connections
DB_CLIENT=
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=

# Server Configs
PORT=
SERVER_HOST=

# Cache Configs
REDISHOST=
REDISPORT=

# Security Configs
SALT_ROUNDS=
ENABLE_HTTPS=
CERT=
KEY=
AUTHSECRET=
```

## End-Points ##

##### LOGIN ON APLLICATION AND GENERATE TOKEN: ###
* Method: POST
* security: Open
* url: "/signin"
* Params:
	* **email:** "String, Required"
	* **password:** "String, Required"


