const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const progRouter = require('./routes/api/progs');
const compilerRouter = require('./routes/api/compilers');
const testRouter = require('./routes/api/tests');

const fileUpload = require('express-fileupload');

const app = express();

// ~~~~~~~~~~~~~~~~~~~~~~ WebSoket ~~~~~~~~~~~~~~~~~~~~~~
// вариант с использованием https://www.npmjs.com/package/ws
const WebSocket = require('ws');
const server = require('http').createServer(app);
/*const wss = new WebSocket.Server({server:server});

wss.on('connection', function connection(ws) {
    console.log('A new client Connected!');
    console.log(wss.clients);
    ws.send('Welcome New Client!');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
                console.log('send msg: %s', message);
            }
        });

    });
    ws.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });


});*/
/* const WebSocket = require('ws');

const ws = new WebSocket('wss://localhost:5000/', {
    origin: 'https://localhost:5000/'
});

const duplex = WebSocket.createWebSocketStream(ws, { encoding: 'utf8' });

duplex.pipe(process.stdout);
process.stdin.pipe(duplex);*/
// ~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Bodyparser Middleware
app.use(express.json());

// загрузка файлов, с опциями
app.use(fileUpload({
    createParentPath: true,
}));


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


app.use('/api/progs', progRouter);
app.use('/api/compilers', compilerRouter);
app.use('/api/tests', testRouter);

// ~~~~~~~~~~~~~~~~~~~~~~ WebSoket ~~~~~~~~~~~~~~~~~~~~~~
// вариант с использованием https://www.npmjs.com/package/websocket
const webSocketServer = require('websocket').server;
//initialize a simple http server
// const server = require('http').createServer(app); // подключен выше
//initialize the WebSocket server instance
const wsServer = new webSocketServer({
    httpServer: server
});
const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};
const sendMsgAllClients =(data)=>{
    // broadcasting message to all connected clients
    for (let key in clients) {
        clients[key].send(data);
        console.log('sent Message to: ', data);
    }
};

wsServer.on('request', function (request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

    // You can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

    connection.on('message', function (message) {
        // if (message.type === 'utf8') {
        //     console.log('Received Message: ', message.utf8Data);
        //
        //     // broadcasting message to all connected clients
        //     for (let key in clients) {
        //         clients[key].sendUTF(message.utf8Data);
        //         console.log('sent Message to: ', key);
        //     }
        // }

        //рабочий вариант
        const { spawn } = require('child_process');
        // для русских символов из консоли Windows
        const iconv = require('iconv-lite');
        //const bat = spawn('cmd.exe', ['/c', 'TestAppForWepApp.exe', '50']);
        const bat = spawn(
          'cmd.exe',
          ['/c', 'TestAppForWepApp.exe', '50'],
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
            //res.send( iconv.encode(iconv.decode(temp, "cp1251"), "cp1251").toString());
            //res.send(iconv.decode(Buffer.from(temp, 'binary'), 'cp1251').toString());
        });

    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~~~~~~~~~~~


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started on port ${port}`));