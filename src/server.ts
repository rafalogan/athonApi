import dotenv from 'dotenv';
import './util/module-alias';
import ProfileEnv from 'src/environment/profile.env';

dotenv.config();

console.log('Tudo pronto');
console.log('enviroment', process.env.NODE_ENV);
console.log('porfile', new ProfileEnv());
