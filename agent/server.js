const express = require('express');
const config = require('config');
const fileUpload = require('express-fileupload');

const app = express();
const server = require('http').createServer(app);

// Bodyparser Middleware
app.use(express.json());

// загрузка файлов, с опциями
app.use(fileUpload({
    createParentPath: true,
}));

// ~~~~~~~~~~~~~~~~~~~~~~ WebSoket ~~~~~~~~~~~~~~~~~~~~~~
const WS = require('./modules/MainWS.js');
WS.mainWebSocket(server);
// ~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~~~~~~~~~~~

const port = process.env.PORT || config.get('serverPort');
server.listen(port, () => console.log(`Server started on port ${port}`));