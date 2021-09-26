const express = require('express');
const router = express.Router();
const db = require('../util/database');

// router.post('/getAttendance', (req, res) => {
//     db.execute('SELECT * from attendance WHERE userid=?', [req.body.id]).then(([rows, fieldData]) => {
//         res.status(200).send(rows);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).send(err);
//     })});


router.get('/:id', (req, res) => {
    db.execute('SELECT * FROM attendance WHERE userid=? ', [req.params.id]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        res.status(500).send(err);
    });
});


router.post('/', (req, res) => {
    db.execute('INSERT INTO attendance (userid, attendance, date) VALUES (?, ?, ?)', [req.body.userid, req.body.attendance, req.body.date]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        res.status(500).send(err);
    });
});

module.exports = router;


