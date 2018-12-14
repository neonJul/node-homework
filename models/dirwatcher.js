import fs from 'fs';

export default class DirWatcher {
    static count = 0;
    watchFile = (path, delay) => {
        setInterval(() => {
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) {
                    throw err;
                }
                if (!DirWatcher.count) {
                    console.log(DirWatcher.count++);
                }
            })
        }, delay)
    };
}