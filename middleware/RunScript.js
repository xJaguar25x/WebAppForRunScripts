exports.getUniqueID = () => {
    // This code generates unique userid for everyuser.
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};
exports.sendMsgAllClients = (clients, data) => {
    // broadcasting message to all connected clients
    for (let key in clients) {
        clients[key].send(data);
        // console.log('sent Message to: ', data);
    }
};
exports.RunScript = (clients, message) => {
    //функция для запуска внешних модулей
    const formData = JSON.parse(message.utf8Data);
    console.log(formData);
    /*message: {
        type: 'utf8',
          utf8Data: '{"prog_name":"stdafx","compiler_name":"wadwd","numbIter":"3"}'
    }*/
    let listOfCodes = [
        {
            code: "system_0",
            type: "system",
            index: null,
            msg: null
        },
        {
            code: "system_1",
            type: "system",
            index: null,
            msg: null
        },
        {
            code: "system_2",
            type: "system",
            index: null,
            msg: null
        },
        {
            code: "program_start_time",
            type: "program",
            index: null,
            msg: null
        },
        {
            code: "program_elapsed_time",
            type: "program",
            index: null,
            msg: null
        },
    ];
    // //рабочий вариант
    const {spawn} = require('child_process');
    // для русских символов из консоли Windows
    const iconv = require('iconv-lite');
    const bat = spawn(
      'cmd.exe',
      ['/c', 'TestScriptForWepApp.exe', formData.numbIter],
      {encoding: 'cp1251', cwd: 'TestScriptForWepApp/x64/Debug/'}
    );
    let temp, tempExit;

    //TODO: чтобы сработало необходимо обновить nodejs до версии 15.1.0
    // https://nodejs.org/api/child_process.html#child_process_event_spawn
    //event is emitted once the child process has spawned successfully
    bat.on('spawn', (code) => {
        // console.log(`Child exited with code ${code}`);
        tempExit = {
            code: 'child_spawn',
            type: 'run_script',
            msg: 'Child process has spawned successfully ' + code
        };
        console.log(tempExit);
        this.sendMsgAllClients(clients, JSON.stringify(tempExit));
    });

    bat.stdout.on('data', (data) => {
        // console.log('length =', data.toString().length, '  ', data.toString());
        // temp += data.toString();
        const runningCode = findCode(data, listOfCodes);
        // console.log('length =', data.toString().length, '  ', data.toString());
        // console.log('\nlistOfCodes =', listOfCodes, '\n');
        if (runningCode) {
            console.log('\nrunningCode =', runningCode, '\n');
            this.sendMsgAllClients(clients, JSON.stringify(runningCode));
        }

        // this.sendMsgAllClients(clients, data.toString());
    });

    bat.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    bat.on('exit', (code) => {
        // console.log(`Child exited with code ${code}`);
        tempExit = {
            code: 'child_closed',
            type: 'run_script',
            msg: 'Child exited with code ' + code
        };
        console.log(tempExit);
        this.sendMsgAllClients(clients, JSON.stringify(tempExit));
        addResultToDb(clients, listOfCodes); //запись данных по завершению скрипта
    });
};

/*//версия с forEach
findCode = (str, listOfCodes) => {
    let runningCode = null;
    listOfCodes.forEach(({code, type}, index) => {
        // console.log(`\n code ${code}\n`);
        const res = str.indexOf(code);
        const len = code.length;
        const lenBeforeMessage = ' Msg: '.length;

        if (res !== -1) {
            listOfCodes[index].index = res;
            listOfCodes[index].msg = str.toString().slice(res + len + lenBeforeMessage)
              .replace(/\r\n/g, '');
            // console.log('\nCode =', listOfCodes[index], '\n');
            runningCode = listOfCodes[index];
            return runningCode;

        }
    });
    return runningCode;
};
*/
findCode = (str, listOfCodes) => {
    for (let i = 0; i < listOfCodes.length; i++) {
        const {code} = listOfCodes[i];
        const res = str.indexOf(code);
        const len = code.length;
        const lenBeforeMessage = ' Msg: '.length;

        if (res !== -1) {
            listOfCodes[i].index = res;
            listOfCodes[i].msg = str.toString().slice(res + len + lenBeforeMessage)
              .replace(/\r\n/g, '');
            // console.log('\nCode =', listOfCodes[index], '\n');
            return listOfCodes[i];
        }
    }
    return 0; //возврат 0, если не найден подходящий код
};

addResultToDb = (clients, obj) => {
    const Result = require('../models/Result');
    const start_time = obj[3].msg.slice(-10) * 1000; // переводим в милисекунды (поддерживаемый формат БД)
    const newTest = new Result({
        name: 'obj.test_name',
        start_time: start_time,
        elapsed_time: obj[4].msg
    });

    newTest.save().then(item => this.sendMsgAllClients(clients, JSON.stringify(item)));
};