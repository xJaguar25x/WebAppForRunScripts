const express = require('express');
const router = express.Router();

// Workstation Model
const Workstation = require('../../models/Workstation');

// @route   GET api/workstation
// @desc    Get All Workstations
// @access  Public
router.get('/', (req, res) => {
    Workstation.find()
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

// @route   POST api/workstation
// @desc    Create An Workstation
// @access  Public
router.post('/', (req, res) => {
    const newWorkstation = new Workstation({
        name: req.body.name,
        type: req.body.type,
        ip_address: req.body.ip_address,
        location: req.body.location,
        description: req.body.description,
    });

    newWorkstation.save()
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

// @route   DELETE api/workstation/:id
// @desc    Delete A Workstation
// @access  Public
router.delete('/:id', (req, res) => {
    Workstation.findById(req.params.id)
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
