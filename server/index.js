const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const contract = require('@truffle/contract');
const Web3 = require('web3');
const BbASJSON = require('../build/contracts/BbAS.json');
const mongo = require('mongodb').MongoClient;
const { JSDOM } = require('jsdom');
const fs = require('fs');


const connectionString = 'mongodb://localhost:27017';
const databaseName = 'BbAS';
const databasePort = 27017;
//const port = 29999;
const client = redis.createClient();
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const networkID = web3.eth.net.getId();

const port = process.env.PORT || 5000;

const BbAS = contract(BbASJSON)
BbAS.setProvider(web3.currentProvider)
BbAS.setNetwork(networkID)

// Web Server Initialization

app.use(session({
    secret: 'badminton', store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260 }),
    saveUninitialized: true, resave: true
}))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/login",require("./routes/login"));
app.use("/api/signup",require("./routes/signup"));
app.use("/api/300",require("./routes/signup"));
app.use("/api/home",require("./routes/home"));
app.use("/api/400",require("./routes/home"));
app.use("/api/register",require("./routes/register"));


app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});