import dotenv from 'dotenv';
import ProfileEnv from 'src/environment/profile.env';

if (process.env.NODE_ENV === 'testing') dotenv.config({ path: '.env.testing' });
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') dotenv.config();

export const profile = new ProfileEnv();
