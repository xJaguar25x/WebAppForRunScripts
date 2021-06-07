const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const fileUpload = require('express-fileupload');

const app = express();

const cors = require('cors');
const server = require('http').createServer(app);

// CORS allow for localhost
const whitelist = ['http://localhost:3000', 'http://localhost:3080']; //white list consumers
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept', 'x-auth-token']
};

app.use(cors(corsOptions)); //adding cors middleware to the express with above configurations

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

// Routing API
app.use('/api/progs', require('./routes/api/progs'));
app.use('/api/compilers', require('./routes/api/compilers'));
app.use('/api/tests', require('./routes/api/tests'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/workstations', require('./routes/api/workstations'));
app.use('/api/results', require('./routes/api/results'));

// ~~~~~~~~~~~~~~~~~~~~~~ WebSoket ~~~~~~~~~~~~~~~~~~~~~~
const WS = require('./middleware/MainWS.js');
WS.mainWebSocket(server);
// ~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~~~~~~~~~~~


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started on port ${port}`));