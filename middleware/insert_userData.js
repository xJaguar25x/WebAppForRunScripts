const mongoose = require("mongoose");
// User Model
const User = require('../models/User');

// auth - функция промежуточной обработки
function insert_userData(req, res, next) {

    try {
// ~~~~~~~~~~~ Вариант 1 ~~~~~~~~~~~~

        // User.findById(req.user.id)
        //   .select('-password')
        //   // .then(user => console.log(user));
        //   // превращает в строку json
        //   // .then(user => console.log(JSON.stringify(user)))
        //   // превращает в в JavaScript-объект/массив/значение
        //   // .then(user => console.log(JSON.parse(user)))
        //
        //   // .then(user => req.user_data = user);
        //   .then(user => req.body.user_data = JSON.stringify(user))
        // // .then(user => console.log(user));
        // .then(user => console.log(req.body.user_data));


        // console.log(user);
        // console.log(JSON.stringify(req.body));
        // res.status(400).json(req.user_data);

// ~~~~~~~~~~~ Вариант 2 ~~~~~~~~~~~~

        // User.findById(req.user.id, function(err, doc){
        //     mongoose.disconnect();
        //
        //     if(err) return console.log(err);
        //
        //
        //     // req.user_data = JSON.stringify(doc);
        //     // console.log(req.user_data);
        //     return doc;
        // });

// ~~~~~~~~~~~ Вариант 3 ~~~~~~~~~~~~

        // const cursor = User.findById(req.user.id).cursor();
        // cursor.on('data', function(doc) {
        //     // req.user_data = JSON.stringify(doc);
        //     req.user_data = doc;
        //     console.log("req in: " + req.user_data);
        //     console.log(doc);
        //     return doc;
        // });
        // console.log(doc);
        // // req.user_data = JSON.stringify(doc);
        // // console.log(req.user_data);
        // console.log("cursor: " + cursor.req.user_data);
        // req.user_data = cursor.req.user_data;

        // console.log(cursor);
        // req.user_data = cursor.doc;
        // console.log("req: " + req.user_data);

// ~~~~~~~~~~~ Вариант 4 ~~~~~~~~~~~~

        // const controllerCheckInput = () => User.findById(req.user.id).select('-password');
        // вариант async/await
        let exists = "123";
        // (async () => {
        //     exists = await controllerCheckInput();
        //     console.log("req exists: " + exists);
        //     return exists;
        // })();

        // вариант then/catch
        (() => {
            User.findById(req.user.id).select('-password').then(data => {
                console.log("req in: " + data);
                console.log("exists in: " + exists);
                exists = data;
                console.log("exists in after: " + exists);
            });
        })();

        console.log("exists out: " + exists);
        req.user_data = exists;
        console.log("req.user_data: " + req.user_data);
        // console.log("controllerCheckInput: " + controllerCheckInput);

        next();
    } catch (e) {
        console.log("error: " + e);
        res.status(401).json({"msg":"Token is not valid", "err": e} );
    }
}

module.exports = insert_userData;
