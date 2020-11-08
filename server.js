const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 4000;

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
module.exports = app;

