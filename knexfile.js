// Update with your config settings.
const { client, connection } = require('./.env');

module.exports = {
  client,
  connection,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
