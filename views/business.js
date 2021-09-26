const express = require('express');
const db = require('../util/database');
const router = express.Router();


router.get('/', (req, res) => {
    db.execute('SELECT * FROM business').then(([rows, fieldData]) => {
        res.write(rows);
        res.end();
    }).catch(err => {
        res.write(err);
    });
});

router.get('/:id', (req, res) => {
    db.execute('SELECT FROM * WHERE id=?', [req.params.id]).then(([rows, fieldData])=> {
        res.status(200).send(rows);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.get('/getUsers', (req, res) => {
    db.execute('SELECT * from user WHERE biz_id=? ', [req.params.bizid]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        res.send(err);
        console.log(err);
    })
})

router.post('/', (req, res) => {
    
})