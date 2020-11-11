const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

//const indexRouter = require('./routes/api/index');
const usersRouter = require('./routes/api/users');
const progRouter = require('./routes/api/progs');
const compilerRouter = require('./routes/api/compilers');

const fileUpload = require('express-fileupload');
const path = require('path');


const app = express();

// Bodyparser Middleware
app.use(express.json());

// загрузка файлов, с опциями
app.use(fileUpload({
    createParentPath: true,
}));

/*app.post('/progs', (req, res) => {
    console.log(req.files);
    const {files} = req;

    if(req.body.prog_name === '' && files === null ){
        return res.status(400).send({status: 400, msg: 'Prog`s name or upload file is empty'});
    }
    //если имя не передано берем имя из имени файла
    const prog_name =
      req.body.prog_name !== ''
        ? req.body.prog_name
        : path.basename(files.fileCode.name, path.extname(files.fileCode.name));

    // создаем объект для БД
    const newProg = new Prog({
        prog_name: prog_name,
        path: files.fileCode ? files.fileCode.name : null,
        meta: files.fileMeta ? files.fileMeta.name : null,
    });

    // проходимся по всем прикрепленным файлам
    for (let file in files) {
        console.log(file + ' ' + files[file].name + '\n');
        //получить имя файла без расширения для создания директории
        const pathName = path.basename(files[file].name, path.extname(files[file].name));
        //записать файлы на диск
        files[file].mv(`${__dirname}/client/public/uploads/${pathName}/${files[file].name}`, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
        });
    }
    newProg.save().then(item => res.json(item));
});*/

// DB Config
// const db = require('./config/config').mongoURI;
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, {
      useNewUrlParser: true
      , useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/progs', progRouter);
app.use('/api/compilers', compilerRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

/*
const bat = require('child_process');
bat.exec('cmd.exe');
bat.exec('cd shellScripts');
bat.execFile('TestAppForWepApp.exe', ['50']);

const { exec } = require('child_process');
exec('"shellScripts/ TestAppForWepApp.exe"', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
*/