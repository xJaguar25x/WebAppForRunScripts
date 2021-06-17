const mySqripts = require('./TaskManager');


// ~~~~~~~~~~~~~~~~~~~~~~ WebSoket ~~~~~~~~~~~~~~~~~~~~~~
exports.mainWebSocket = function (server) {
    // не рабочие варианты
    // ~~~~~~~~~~~~~~~~~~~~~~ WebSoket ~~~~~~~~~~~~~~~~~~~~~~
// вариант с использованием https://www.npmjs.com/package/ws
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

// вариант с использованием https://www.npmjs.com/package/websocket
    const webSocketServer = require('websocket').server;
//initialize a simple http server
// const server = require('http').createServer(app); // подключен выше
//initialize the WebSocket server instance
    const wsServer = new webSocketServer({httpServer: server});
    // I'm maintaining all active connections in this object
    const clients = {};

    wsServer.on('request', function (request) {
        let userID = mySqripts.getUniqueID();
        console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

        // You can rewrite this part of the code to accept only the requests from allowed origin
        const connection = request.accept(null, request.origin);
        clients[userID] = connection;
        console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

        //событие при получении сообщения
        connection.on('message', function (message) {
            //вызов TaskManager
            mySqripts.TaskManager(clients, message);
        });

        // событие при закрытие соединения
        connection.on('close', function (reasonCode, description) {
            delete clients[userID];
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
            console.log('\n reasonCode ' + reasonCode + ' description.' + description + " ws" + JSON.stringify(connection));
        });
    });
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~~~~~~~~~~~