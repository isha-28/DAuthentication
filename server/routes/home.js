const express = require('express');
const router = express.Router();
const db = require('../db')
const path=require('path');

router.get('/', (req, res) => {
   console.log('home server');
   try {
    console.log("In home");
    res.sendFile(path.join(process.cwd(),'/client/src/pages/SamplePage/Home.html'));
    } catch (err) {
        response.status(401).send(err)
    }
});

module.exports = router;
