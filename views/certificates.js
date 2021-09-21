const express = require('express');
const router = express.Router();
const db = require('../util/database');

router.get('/', (req, res) => {
    db.execute('SELECT * FROM certificates').then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        res.status(500).send(err);
        console.log(err);
    });
});

router.get('/:id', (req, res) => {
    db.execute('SELECT * FROM certificates WHERE id=?', [req.params.id]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        res.status(500).send(err);
        console.log(err);
    });
});

router.post('/', (req, res) => {
    db.execute('INSERT INTO certificates (userid, title, description, date) VALUES (?, ?, ?, ?)', [req.body.userid, req.body.title, req.body.description, req.body.date]).then((rows, fieldData) => {
        res.status(200).send(rows);
    }).catch(err => {
        res.status(500).send(err);
        console.log(err);
    });

});


module.exports = router;