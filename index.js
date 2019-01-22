const app = require('express')();
const consign = require('consign');

const db = require('./config/db');
const mailer = require('./config/mailer');

app.db = db;
app.mailer = mailer;

consign()
    .include('./config/passport.js')
    .then( './config/middleware.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app);

app.listen(3000, () => {
    console.log('Execultando Athon Api...')
});