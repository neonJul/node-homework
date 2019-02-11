// import config from './config/config';
// import {User, Product, DirWatcher, Importer} from './models';

//first homework
// console.log(config.name);
// let user = new User();
// let product = new Product();

//second homework
// const path1 = './data';
// let dirWatcher = new DirWatcher();
// let importer = new Importer();
//
// dirWatcher.watchFile(path1, 1000);

//third homework
const args = process.argv.slice(2);
switch (args[0]) {
    case undefined:
        console.log("undefined");
        break;
    default:
        console.log(process.argv[2]);
}