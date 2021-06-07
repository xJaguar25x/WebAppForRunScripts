const express = require('express');
const router = express.Router();
const path = require('path');

// Prog Model
const Prog = require('../../models/Prog');

// @route   GET api/progs
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    Prog.find()
      .sort({date: -1})
      .then(progs => {
          res.json(progs);
          // console.log(progs);
      });

});

// @route   POST api/progs
// @desc    Create An Prog
// @access  Public
router.post('/', async (req, res) => {
    // console.log("req", req);
    console.log(req.files);
    const {files} = req;
    let uploadFiles = {};
    let uploadProg_name = req.body.prog_name;

    if (files === null) {
        return res.status(400).send({status: 400, msg: 'Uploading program`s file is missing'});
    } else {
        //если имя не передано берем имя из имени файла
        console.info(files.hasOwnProperty('fileCode'));
        if (uploadProg_name === '' && files.hasOwnProperty('fileCode')) {
            uploadProg_name = path.basename(files.fileCode.name, path.extname(files.fileCode.name));
        }

        // создаем объект для БД
        uploadFiles = {
            path: files.fileCode ? files.fileCode.name : null,
            meta: files.fileMeta ? files.fileMeta.name : null,
        };

        // проходимся по всем прикрепленным файлам
        for (let file in files) {
            console.log(file + ' ' + files[file].name + '\n');
            //получить имя файла без расширения для создания директории
            const pathName = path.basename(files[file].name, path.extname(files[file].name));
            //записать файлы на диск
            files[file].mv(`./client/public/uploads/${pathName}/${files[file].name}`, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
            });
        }
    }

    // создаем объект для БД
    const newProg = new Prog({
        prog_name: uploadProg_name,
        ...uploadFiles
    });
    newProg.save().then(item => res.json(item));
});

// @route   DELETE api/progs/:id
// @desc    Delete A Prog
// @access  Public
router.delete('/:id', (req, res) => {
    Prog.findById(req.params.id)
      .then(item => item.remove().then(() => res.status(200).json({msg: "delete success"})))
      .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
