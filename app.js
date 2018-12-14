import config from './config/config';
import {User, Product, DirWatcher} from './models';

console.log(config.name);
let user = new User();
let product = new Product();

//second homework
const path = './data/data.txt';
let dirWatcher = new DirWatcher();
dirWatcher.watchFile(path, 100);
