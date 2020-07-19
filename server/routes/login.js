const WebServiceHandler=require('./webservice');
const PrivateBlockchainHandler=require('./blockchainhandler');
const express = require('express');
const router = express.Router();
const db = require('../db')

const PBH = new PrivateBlockchainHandler();
const WSH = new WebServiceHandler();
const port = process.env.PORT || 5000;

router.post('/', async function (request, response) {
    console.log('yayyy');
    try {
        request.session.address = request.body.address;
         console.log(request.session.address);
        let res = await PBH.loginUser(request.session.address);
        console.log("Generated :", res[0], "\nReal : ", res[1]);
        if (parseInt(res[0]) == 0) {
            console.log("Zero found");
           response.redirect(300,'/api/signup',safe=true);
        } else {
            response.redirect(400,'/api/home',safe=true);
        }
    } catch (err) {
        response.status(401).send(err)
    }
});

module.exports = router;

