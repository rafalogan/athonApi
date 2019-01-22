const lowDb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./service/stats_db.json');
const statsdb = lowDb(adapter);

module.exports = statsdb;