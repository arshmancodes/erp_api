const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("This is the main endpoint for the Admin Panel");
    res.end();
});

router.get('/:id', (req, res) => {
    res.send(req.params.id);
    res.end();
});

module.exports = router;

