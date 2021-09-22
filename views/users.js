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
    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);
    db.execute('SELECT * FROM user WHERE id=?', [req.params.id]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        console.log(err);
    })
});

// router.post('/', (req, res) => {
//     db.execute('SELECT * FROM user where username=?', [req.params.username]).then(([rows, fieldData]) => {
//         if(rows.length > 0)
//         {
//             if(rows[0].username === req.params.username)
//             {
//                 res.status(409).send(rows);

//             }
//         }
//         else
//         {
//             db.execute("INSERT INTO user (username, password, name) VALUES (?, ?, ?)", [req.body.username, req.body.password, req.body.name]).then(([rows, fieldData]) => {
//             res.status(200).send(rows);
//         }).catch(err => {

//         });
//             // return bcrypt.hash(req.params.password, 12);
//         }
//     });
// })

router.post('/', (req, res) => {
        db.execute('INSERT INTO user (username, password, name) VALUES (?, ?, ?)', [req.body.username, req.body.password,req.body.name]).then(([rows, fieldData]) => {
            res.status(200).send(rows);
        }).catch(err =>{
            console.log(err);
            res.status(404).send(err);
        });
});

 router.delete('/', (req, res) => {
     db.execute("DELETE FROM user WHERE id=?", [req.body.id]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
     }).catch(err => {
         res.status(404).send("Cannot delete");
     });
 })       


module.exports = router;