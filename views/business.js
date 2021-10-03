const express = require('express');
const { error } = require('npmlog');
const db = require('../util/database');
const router = express.Router();


router.get('/', (req, res) => {
    db.execute('SELECT * FROM business_employee').then(([rows, fieldData]) => {
        res.json(rows);
    }).catch(err => {
        res.json(err);
    });
});

router.get('/:id', (req, res) => {
    db.execute('SELECT * FROM business_employee WHERE id=?', [req.params.id]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.get('/get-business-employee/:bizId', (req, res) => {

    db.execute('SELECT * from business_employee WHERE biz_id=? ', [req.params.bizId]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        res.send(err);
    })
})

router.post('/add-employee/:bizId', (req, res) => {
    const bizId = req.params.bizId;
    const { fullName, phone_number, email, postal, citytown, qrCode } = req.body;

    db.execute('INSERT INTO business_employee (fullName, phone_number, email, postal, citytown, qrCode, biz_id) VALUES (?,?,?,?,?,?,?)', [fullName, phone_number, email, postal, citytown, qrCode, bizId])
        .then(([rows, fieldData]) => {
            res.status(200).json({ message: "Employee added" });
        }).catch(err => {
            res.status(404).send(err);
        })

})


module.exports = router;