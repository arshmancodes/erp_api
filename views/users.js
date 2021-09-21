const express = require('express');
const router = express.Router();
const db = require('../util/database');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

router.get('/', (req, res) => {
    
    db.execute('SELECT * FROM user').then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }

    ).catch(err => {
        res.status(404).send(err);

    });
});

router.get('/:id', (req, res) => {
    db.execute('SELECT * FROM user WHERE id=?', [req.params.id]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        console.log(err);
    })
});

router.post('/', (req, res) => {
    User.findOne({})
})

 router.delete('/', (req, res) => {
     db.execute("DELETE FROM user WHERE id=?", [req.body.id]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
     }).catch(err => {
         res.status(404).send("Cannot delete");
     });
 })       


module.exports = router;