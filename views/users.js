const express = require('express');
const router = express.Router();
const db = require('../util/database');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');


//! GET ALL USERS
router.get('/', (req, res) => {
    db.execute('SELECT * FROM user').then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        res.status(404).send(err);

    });
});

//! GET USER BY ID
router.get('/:id', (req, res) => {

    db.execute('SELECT * FROM user WHERE id=?', [req.params.id]).then(([rows, fieldData]) => {

        if (rows.length > 0) {
            res.status(200).send(rows[0]);
        } else {
            res.status(404).json({
                'message': "No such record"
            });
        }


    }).catch(err => {
        console.log(err);
    })
});

//! REGISTER ACCOUNT
router.post('/register', (req, res) => {

    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);

    db.execute('SELECT * FROM user WHERE username = ?', [req.body.username]).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            if (rows[0].username == req.body.username) {
                res.status(409).json({
                    message: 'Username Already exists',
                    success: false
                });
                next();
            }
        } else {
            db.execute('INSERT INTO user (username, password, email) VALUES (?, ?, ?)', [req.body.username, req.body.password, req.body.email]).then(([rows, fieldData]) => {
                res.status(200).json({
                    message: "Account created successfully",
                    success: true,
                    userId: object['insertId'],
                });
            }).catch(err => {
                res.status(500).json({
                    message: err.message,
                    success: false
                });
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })
});

//! LOGIN ACCOUNT
router.post('/login', (req, res, next) => {
    db.execute('SELECT * FROM user WHERE username = ?', [req.body.username]).then(([rows, fieldData]) => {
        if (rows.length > 0) {
            const validPassword = compareSync(req.body.password, rows[0].password);
            if (validPassword) {
                res.status(200).json({
                    message: 'Login Successful',
                    success: true,
                    userId: rows[0].id,
                    branchId: rows[0].branchid == null ? rows[0].id : rows[0].branchid,
                });
            } else {
                res.status(404).json({
                    message: "Invalid email or password",
                    success: false
                });
            }

        } else {
            res.status(404).json({
                message: "Invalid email or password",
                success: false
            });
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        });
    })
})


//! DELETE 
router.delete('/', (req, res) => {
    db.execute("DELETE FROM user WHERE id=?", [req.body.id]).then(([rows, fieldData]) => {
        res.status(200).send(rows);
    }).catch(err => {
        res.status(404).send("Cannot delete");
    });
})


module.exports = router;