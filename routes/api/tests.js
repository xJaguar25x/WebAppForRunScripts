const express = require('express');
const router = express.Router();

// Test Model
const Test = require('../../models/Test');

// @route   GET api/tests
// @desc    Get All Tests
// @access  Public
router.get('/', (req, res) => {
    Test.find()
      .sort({ date: -1 })
      .then(orders => res.json(orders));
});

// @route   POST api/tests
// @desc    Create An Test
// @access  Public
router.post('/', (req, res) => {
    const newTest = new Test({
        test_name: req.body.test_name,
        prog_id: req.body.prog_id,
        compiler_id: req.body.compiler_id
    });

    newTest.save().then(item => res.json(item));
});

// @route   DELETE api/tests/:id
// @desc    Delete A Test
// @access  Public
router.delete('/:id', (req, res) => {
    Test.findById(req.params.id)
      .then(item => item.remove().then(() => res.status(200).json({msg:"delete success"})))
      .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
