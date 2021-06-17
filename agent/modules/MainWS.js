const mySqripts = require('./TaskManager');
const config = require('config');

// ~~~~~~~~~~~~~~~~~~~~~~ WebSoket ~~~~~~~~~~~~~~~~~~~~~~
exports.mainWebSocket = function (server) {
    // вариант с использованием https://www.npmjs.com/package/websocket
    // создание клиента WebSocket
    const WebSocketClient = require('websocket').client;
    const wsClient = new WebSocketClient();


    // "ws://www.mygreatapp.com:1234/websocketapp/"
    const destinationServerIp = config.get('destinationServerIp');
    const destinationServerPort = config.get('destinationServerPort');
    const destinationServerWsUrl = "ws://" + destinationServerIp + ":" + destinationServerPort + "/";
    const clientProtocols = [ "5000"];
    // создание соединения
    wsClient.connect(destinationServerWsUrl, clientProtocols);
    wsClient.on('connect', handler);
    function handler(connection) {
        connection.on('message', function (message) {
          // делаем что-нибудь с пришедшим сообщением
          console.log(message);
        });
        // посылаем сообщение серверу
        connection.sendUTF('Hi, there!');
      };

    wsClient.on('request', function (request) {
        let userID = mySqripts.getUniqueID();
        console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

        // You can rewrite this part of the code to accept only the requests from allowed origin
        const connection = request.accept(null, request.origin);
        mainServer[userID] = connection;
        console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(mainServer));

        //событие при получении сообщения
        connection.on('message', function (message) {
            //вызов TaskManager
            mySqripts.TaskManager(mainServer, message);
        });

        // событие при закрытие соединения
        connection.on('close', function (reasonCode, description) {
            delete mainServer[userID];
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
            // console.log('\n reasonCode ' + reasonCode + ' description.' + description + " ws" + JSON.stringify(connection));
        });
    });
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~~~~~~~~~~~