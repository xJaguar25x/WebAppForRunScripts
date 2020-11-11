const express = require('express');
const router = express.Router();

// Compiler Model
const Compiler = require('../../models/Compiler');

// @route   GET api/compiler
// @desc    Get All Compilers
// @access  Public
router.get('/', (req, res) => {
    Compiler.find()
      .sort({ date: -1 })
      .then(orders => res.json(orders));
});

// @route   POST api/compiler
// @desc    Create An Compiler
// @access  Public
router.post('/', (req, res) => {
    const newCompiler = new Compiler({
        compiler_name: req.body.compiler_name,
        command_to_compile: req.body.command_to_compile,
        command_to_run: req.body.command_to_run
    });

    newCompiler.save().then(item => res.json(item));
});

// @route   DELETE api/compiler/:id
// @desc    Delete A Compiler
// @access  Public
router.delete('/:id', (req, res) => {
    Compiler.findById(req.params.id)
      .then(item => item.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
