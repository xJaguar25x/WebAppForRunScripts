const express = require('express');
const router = express.Router();

// Workstation Model
const Result = require('../../models/Result');

// @route   GET api/result
// @desc    Get All Results
// @access  Public
router.get('/', (req, res) => {
    Result.find()
      .sort({date: -1})
      .then(
        items => {
            res.json(items)
        },
        error => {
            res.status(404)
              .json({
                  type: "API error",
                  error: true,
                  msg: `get error`,
                  log: error.toString()
              })
        }
      );
});

// @route   POST api/result
// @desc    Create An Result
// @access  Public
router.post('/', (req, res) => {
    const newResult = new Result({
        name: req.body.name,
        start_time: req.body.start_time,
        elapsed_time: req.body.elapsed_time
    });

    newResult.save()
      .then(
        item => {
            res.json(item)
        },
        error => {
            res.status(404)
              .json({
                  type: "API error",
                  error: true,
                  msg: `save error`,
                  log: error.toString()
              })
        }
      );
});

// @route   DELETE api/result/:id
// @desc    Delete A Result
// @access  Public
router.delete('/:id', (req, res) => {
    Result.findById(req.params.id)
      .then(
        item => {
            item.remove()
              .then(
                success => {
                    res.status(200).json({
                        type: 'API',
                        status: 'success',
                        msg: "delete success",
                        data: success
                    })
                }
              )
        },
        error => {
            res.status(404)
              .json({
                  type: "API error",
                  error: true,
                  msg: `delete error`,
                  log: error.toString()
              })
        }
      )
      .catch(err => res.status(404).json({msg: "deletion error"}));
});

module.exports = router;
