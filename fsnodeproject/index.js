
/*1) С помощью module fs необходимо:

    создать папку, и 3 файлы любым именем ( предусмотреть папка создавалась если не существует)
Реалиовать удаление всех файлов в текущей папке( метод unlink)
cоздать текстовый файлом с любым содержимым и считать содержимое и перенести любой другой файл.*/

const fs = require ('fs');
const util = require('util');
const path = require('path');


const dir = 'test';

if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}


const files = ['file1', 'file2', 'file3'];

const fileAsync = util.promisify(fs.writeFile);

async function run() {
    const createFile = files.map(file => fileAsync('test/' + file + '.txt', 'File Content'));
    await Promise.all(createFile);
}
run();

/*const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

async function toRun() {
    const files1 = await readdir(dir);
    const unlinkPromises = files1.map(filename => unlink(filename));
    return Promise.all(unlinkPromises);
}
toRun();*/

const hello = 'HELLO WORD';

fs.writeFile('data.txt', hello, 'utf8', err => {
    if (err) throw err;
    console.log('Done')
});

fs.readFile('data.txt', 'utf8',function(error, data){
    if(error) throw error;
    console.log(data);
});



const mv = util.promisify(fs.rename);

async function moveThem() {
    const original = path.join(__dirname, "data.txt");
    const target = path.join(__dirname, "test", "data.txt");
    await mv(original, target);
}
moveThem();