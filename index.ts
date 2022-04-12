import './src/util/module-alias';
import { appModule } from './src/server';

(async () => appModule.init())();
