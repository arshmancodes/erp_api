const express = require('express');
const router = express.Router();
const db = require('../util/database');

function join(t, a, s) {
    function format(m) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(t);
    }
    return a.map(format).join(s);
}

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

    let formate = [{ year: 'numeric' }, { month: 'numeric' }, { day: 'numeric' }, ];
    let formattedDate = join(new Date, formate, '-');

    db.execute("SELECT * FROM attendance WHERE userid = ? AND date = ?", [req.body.userid, formattedDate]).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            res.status(200).send({ message: "Attendance Already recorded for user: " + req.body.userid });
        } else {
            db.execute('INSERT INTO attendance (userid, attendance, date) VALUES (?, ?, ?)', [req.body.userid, req.body.attendance, formattedDate]).then(([rows, fieldData]) => {
                res.status(200).send({ message: "Attendance recorded for user: " + req.body.userid });
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    })


});




module.exports = router;