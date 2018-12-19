import fs from 'fs';
import { join } from 'path';
import { readdir, stat } from 'fs-promise';
import util from 'util';
import event from './eventEmitterObject';

export default class DirWatcher {
    firstWatch = true;
    path = './data';
    filesObj = {};

    watchFile = (path, delay) => {
        setInterval(() => {
            this.getDirectories(this.path)
                .then((files) => {
                    if (this.firstWatch) {
                        files.forEach((file) => this.filesObj[file] = new Date(util.inspect(fs.statSync(file).mtime)).toString());
                        this.firstWatch = !this.firstWatch;
                    } else {
                        files.forEach((file) => {
                            if (this.filesObj[file] !==  new Date(util.inspect(fs.statSync(file).mtime)).toString()) {
                                event.emit('changed', file);
                                this.filesObj[file] = new Date(util.inspect(fs.statSync(file).mtime)).toString();
                            }
                        })

                    }
                });
        }, delay)
    };

    getDirectories = async (dir, allFiles = []) => {
        const files = (await readdir(dir)).map(f => join(dir, f));
        allFiles.push(...files);
        await Promise.all(files.map(async f => (
            (await stat(f)).isDirectory() && this.getDirectories(f, allFiles)
        )));
        return  this.filterDirectories(allFiles);
    };

    filterDirectories = (files) => {
        return files.filter((file) => !fs.lstatSync(file).isDirectory());
    };
}


