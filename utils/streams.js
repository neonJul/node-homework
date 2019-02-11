const program = require('commander');
const fs = require('fs');
const csv = require('csvtojson');

program
    .version('0.1.0')
    .option('-h, --help', 'Help option')
    .option('-a, --action <type>', 'Action option')
    .option('-f, --file <filePath>', 'Second argument for some actions')
    .option('-p, --path <filePath>', 'Second argument for extra action')
    .parse(process.argv);

const proc = process.argv.splice(2);

if (proc.length === 0 || proc[0] === '-h' || proc[0] === '--help') {
    console.log('Here is help message!');
} else if (proc[0] === '-a' || proc[0] === '--action') {
    switch(program.action) {
        case 'reverse':
            reverse();
            break;
        case 'transform':
            transform();
            break;
        case 'outputFile':
            outputFile(program.file);
            break;
        case 'convertFromFile':
            convertFromFile(program.file);
            break;
        case 'convertToFile':
            convertToFile(program.file);
            break;
        case 'cssBundler':
            cssBundler(program.path);
            break;
        default:
            console.log('Type a correct action');
    }
} else {
    console.log('Please ask for help or write an action!');
}

function reverse() {
    process.stdin.on('data', data => {
        process.stdout.write(data.reverse());
        process.exit();
    });
}

function transform() {
    process.stdin.on('data', data => {
        process.stdout.write(data.toString().toUpperCase());
        process.exit();
    });
}

//node streams.js -a outputFile -f "C:\Projects\node-homework\data\data.txt"
function outputFile(filePath) {
    fs.createReadStream(filePath).pipe(process.stdout);
}

function convertFromFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            csv()
                .fromFile(filePath)
                .then((jsonObj)=>{
                    process.stdout.write(JSON.stringify(jsonObj));
                    process.exit();
                })
        }
    } catch (err) {
        console.log('error')
    }
}

function convertToFile(filePath) {
    const newPath = filePath.substr(0, filePath.lastIndexOf('.')) + '.json';
    try {
        if (fs.existsSync(filePath)) {
            csv()
                .fromFile(filePath)
                .then((jsonObj)=>{
                    const newFile = fs.createWriteStream(newPath);
                    newFile.write(JSON.stringify(jsonObj));
                    newFile.end();
                })
        }
    } catch (err) {
        console.error(err)
    }
}


