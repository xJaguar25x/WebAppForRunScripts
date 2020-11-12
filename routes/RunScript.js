function RunScript(message) {
    const formData = JSON.parse(message.utf8Data);
    console.log(formData.numbIter);
    console.log(formData);
    /*message: {
        type: 'utf8',
          utf8Data: '{"prog_name":"stdafx","compiler_name":"wadwd","numbIter":"3"}'
    }*/

    //рабочий вариант
    const {spawn} = require('child_process');
    // для русских символов из консоли Windows
    const iconv = require('iconv-lite');
    //const bat = spawn('cmd.exe', ['/c', 'TestAppForWepApp.exe', '50']);
    const bat = spawn(
      'cmd.exe',
      ['/c', 'TestAppForWepApp.exe', formData.numbIter],
      {encoding: 'cp1251', cwd: 'C:/Users/Jaguar25/source/repos/TestAppForWepApp/x64/Debug/'}
    );
    let temp, tempExit;

    bat.stdout.on('data', (data) => {
        console.log(data.toString());
        temp += data.toString();
        sendMsgAllClients(data.toString());
    });

    bat.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    bat.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
        tempExit = `Child exited with code ${code}`;
    });
};