import config from './config/config';
import {User, Product, DirWatcher, Importer} from './models';

//first homework
// console.log(config.name);
// let user = new User();
// let product = new Product();

//second homework
const path1 = './data';
let dirWatcher = new DirWatcher();
let importer = new Importer();

dirWatcher.watchFile(path1, 1000);