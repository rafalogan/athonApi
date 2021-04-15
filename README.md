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

On Development environment need to create a file `.env` with then variables:
```.dotenv
# VARIABLES OF ENVIROMENT
# ENVIRONMENT
NODE_ENV=

# SERVER CONFIGS
PORT=
HOST=

# TIMEZONE
TIMEZONE=

# DATA BASE CONFIG CONNECTIONS RELATIONAL
DB_CLIENT=
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=

# DATA BASE CONFIG CONNECTIONS NO RELATIONAL
DBNR_PREFIX=
DBNR_USER=
DBNR_PASSWORD=
DBNR_HOST=
DBNR_PORT=
DBNR_DATABASE=

# CACHE CONFIGS
REDISHOST=
REDISPORT=

# SECURITY CONFIGS
SALT_ROUNDS=
ENABLE_HTTPS=
CERT=
KEY=
AUTHSECRET=
```
On test environment create ```.env.testing```:
```.dotenv
# VARIABLES OF ENVIROMENT
# ENVIRONMENT
NODE_ENV=

# SERVER CONFIGS
PORT=
HOST=

# TIMEZONE
TIMEZONE=

# DATA BASE CONFIG CONNECTIONS RELATIONAL
# USE SQLITE3
DB_CLIENT=
DB_FILENAME=

# DATA BASE CONFIG CONNECTIONS NO RELATIONAL
DBNR_PREFIX=
DBNR_USER=
DBNR_PASSWORD=
DBNR_HOST=
DBNR_PORT=
DBNR_DATABASE=

# CACHE CONFIGS
REDISHOST=
REDISPORT=

# SECURITY CONFIGS
SALT_ROUNDS=
ENABLE_HTTPS=
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


