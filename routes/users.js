var express = require('express');
var router = express.Router();
// для русских символов из консоли Windows
const iconv = require('iconv-lite');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //рабочий вариант
    const { spawn } = require('child_process');
    //const bat = spawn('cmd.exe', ['/c', 'TestAppForWepApp.exe', '50']);
    const bat = spawn(
      'cmd.exe',
      ['/c', 'TestAppForWepApp.exe', '50'],
      {encoding: 'cp1251', cwd: 'C:/Users/Jaguar25/source/repos/TestAppForWepApp/x64/Debug/'}
      );
    var temp,tempExit;

    bat.stdout.on('data', (data) => {
        console.log(data.toString());
        temp += data.toString();
        //res.send( data.toString());
    });

    bat.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    bat.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
        tempExit = `Child exited with code ${code}`;
        //res.send( iconv.encode(iconv.decode(temp, "cp1251"), "cp1251").toString());
        res.send(iconv.decode(Buffer.from(temp, 'binary'), 'cp1251').toString());
    });

  //res.send(`respond with a resource ${temp} ${tempExit}`);
});

module.exports = router;
