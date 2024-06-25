const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..','views', 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(err.status || 500).send('Error loading page');
        }
    });
});

module.exports = router;