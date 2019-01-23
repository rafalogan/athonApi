Athon API
-
API RestFull Nodejs and MySQL

Requires:

- NodJs
- MySQL
- Knex

Install:

- Clone this repositore in your project folder
     - Open your terminal in the project folder 
     - Run this code  { npm install }

configurations:

- Open the file: env_file
     
        module.exports = {
          authSecret: 'yourAuthsecret',
          connection: {
              database: 'your_database_name',
              user: 'yourUserDb',
              password: 'yourPasswordDb'
          },
          mailer: {
              service: 'yourEmailService ex.: gmail',
              mail: 'youremail@youremail',
              pass: 'yourEmalPassword'
          }
      };
    - Next save this file as .env

***Ps.: Don't forget to create your database in mysql before***

Run API:

- With the terminal open:
    - Run { npm start } to development environment
    - Run { npm run production } to production environment


Português
-
API RestFull Nodejs e MySQL

Requisitos:

- NodJs
- MySQL
- Knex

Instalação:

- Clone esse repositório na pasta do seu projeto
     - Abra o terminal na pasta do seu projeto 
     - Rode o seguinte comando  { npm install }

Configurações:

- Abra o arquivo: env_file
     
        module.exports = {
          authSecret: 'seuAuthsecret',
          connection: {
              database: 'nome_do_bancoDeDados',
              user: 'seu usuário MySQL',
              password: 'sua Senha'
          },
          mailer: {
              service: 'seu serviço de e-mail ex.: gmail',
              mail: 'seuemail@seuemail',
              pass: 'sua senha de e-mail'
          }
      };
    - Em seguida salve o arquivo como .env

***Obs.: não se esqueça de criar antes seu banco de dados no MySQL***

Rodando API:

- Com o terminal aberto:
    - Rode { npm start } para o ambiente de desenvolvimento
    - Rode { npm run production } para o ambiente de produção

Français
-
API RestFull Nodejs et MySQL

exigence:

- NodJs
- MySQL
- Knex

l'installation:

- Cloner ce référentiel dans votre dossier de projet
     - Ouvrez le terminal dans votre dossier de projet 
     - Tournez la commande suivante  { npm install }

Paramètres:

- Ouvrir le fichier: env_file
     
        module.exports = {
          authSecret: 'voterAuthsecret',
          connection: {
              database: 'nom de la base de données',
              user: 'votre utilisateur MySQL',
              password: 'votre mot de passe MySQL'
          },
          mailer: {
              service: 'Votre service de e-mail ex.: gmail',
              mail: 'votreemail@voteremail',
              pass: 'votre mot de passe e-mail'
          }
      };
    - Puis enregistrez le fichier sous .env

***Obs.:n'oubliez pas de créer votre base de données dans le MySQL***

Exécution API:

- Avec le terminal ouvert:
    - Tournez { npm start } à l'environnement de développement
    - Tournez { npm run production } à l'environnement de production