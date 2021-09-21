const express = require('express');
const router = express.Router();
const db = require('../util/database');



router.get('/', (req, res) => {
    db.execute('SELECT * FROM history').then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        console.log(err);
    });
});

router.get('/:id', (req, res) => {
    db.execute('SELECT * FROM history WHERE id=?', [req.params.id]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        res.status(500).send(err);
        console.log(err);
    });
});

router.post('/', (req, res) => {
    db.execute('INSERT INTO history (checkin, date, userid) VALUES (?, ?, ?)', [req.body.checkin, req.body.date, req.body.userid]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        res.status(500).send(err);
        console.log(err);
    });
});

module.exports = router;