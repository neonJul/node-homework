import event from './eventEmitterObject';
import fs from 'fs';

export default class Importer {
    constructor() {
        event.on('changed', (path) => {
            this.importPath(path)
                .then((data) => console.log(data.toString('utf8')));
        })
    }

    importPath = (path) => new Promise((resolve) => {
        fs.readFile(path, (err, data) => resolve(data));
    });

    importPathSync = (path) => fs.readFileSync(path);
}