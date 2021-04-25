import './util/module-alias';
import { httpOptions, profile } from 'src/environment';
import { knexConfig } from 'src/config';
import { camelToSnake, snakeToCamel } from 'src/util';

console.log(profile);
console.log(knexConfig);
console.log(httpOptions);

console.log('teste to camel', snakeToCamel('teste_to_camel_case'));
console.log('teste to saker', camelToSnake('testeToSanker'));
