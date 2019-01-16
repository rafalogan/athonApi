// Update with your config settings.
const { clientDataBase, connection } = require('.env');

module.exports = {
  client: clientDataBase,
  connection,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
