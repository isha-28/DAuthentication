const WebServiceHandler=require('./webservice');
const PrivateBlockchainHandler=require('./blockchainhandler');
const express = require('express');
const router = express.Router();
const db = require('../db')

const PBH = new PrivateBlockchainHandler();
const WSH = new WebServiceHandler();
const port = process.env.PORT || 5000;


router.post('/', async function (request, response) {
   try {
       // Get params sent by form

       const username = request.body.name
       const realAddress = request.session.address
       console.log("Address : ", realAddress)
       response.redirect(400,'/api/home',safe=true);
       let resp = "Thanks " + username + " \nYour address currently is : " + realAddress
       let generatedAddress = await PBH.signupUser(realAddress)
       console.log("generated address : ", generatedAddress)



       // Create record for user in Mongo

       let _ = await WSH.registerUser(username, generatedAddress)
       if (_ > 0) {
           let file = fs.readFileSync(process.cwd()+ '/client/src/pages/SamplePage/Home.html');
           console.log(file);
           let respFile = new JSDOM(file)
           respFile.window.document.getElementById("top").innerHTML = "Thank you for registering!!"
           respFile.window.document.getElementById("content").innerHTML = "Your generated address is : " + generatedAddress
           response.send(respFile.serialize())
       } else {
           response.status(401).send("Registration Unsuccessfull!!")
       }
   } catch(err) {
      console.log(err);
       response.status(401).send(err)
   }

})

module.exports = router;

