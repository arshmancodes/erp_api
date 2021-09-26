const express = require('express');
const router = express.Router();
const db = require('../util/database');


router.post('/', (req, res) => {
    db.execute('UPDATE user SET biz_name= ? WHERE id=?'[req.body.bizid, req.body.id]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        res.status(500).send(err);
        console.log(err);
    });


});

module.exports = router;