const express = require('express');
const router = express.Router();
const db = require('../db')
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
const BbASJSON = require('../../build/contracts/BbAS.json');
const mongo = require('mongodb').MongoClient;
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const connectionString = 'mongodb://localhost:27017';
const databaseName = 'BbAS';
const databasePort = 27017;
//const port = 29999;
const client = redis.createClient();
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const networkID = web3.eth.net.getId();


let database
let dbResult
let userCollection
let dbClient
let err
let timeOutDelay = 2000

const BbAS = contract(BbASJSON)
BbAS.setProvider(web3.currentProvider)
BbAS.setNetwork(networkID)

class WebServiceHandler {
        async getDetailsOfUser(generatedAddress) {
            try {
                console.log("Generated Address : ", generatedAddress)
                // Method that takes in generated address and sends all the details from DB
                err, dbClient = await mongo.connect(connectionString, { useUnifiedTopology: true }, (err, dbClient))
    
                // Return if any error is caught
                if (err)
                    return err
    
                database = dbClient.db('Test2')
                userCollection = database.collection('Users')
                dbResult = await userCollection.findOne({
                    generatedAddress: generatedAddress
                })
    
                // console.log("DB Result ",dbResult)
                return Promise.resolve(dbResult)
            } catch (error) {
                console.log(error)
                return 0
            }
    
        }
        async registerUser(username, generatedAddress, currentBalance = 0) {
    
            // Method that registers user with details in the database 
            try {
                // Method that takes in generated address and sends all the details from DB
                err, dbClient = await mongo.connect(connectionString, { useUnifiedTopology: true }, (err, dbClient))
    
                // Return if any error is caught
                if (err)
                    return err
    
                database = dbClient.db('Test2')
                userCollection = database.collection('Users')
                dbResult = await userCollection.insertOne({
                    username: username,
                    generatedAddress: generatedAddress,
                    currentBalance: currentBalance,
                    transactionHistory: []
                })
                // console.log(dbResult)
                return dbResult.insertedCount
            } catch (error) {
                console.log(error)
                return 0
            }
        }
    
        async updateUsername(username, generatedAddress) {
    
            // Method that changes username in database
            try {
                // Method that takes in generated address and sends all the details from DB
                err, dbClient = await mongo.connect(connectionString, { useUnifiedTopology: true }, (err, dbClient))
    
                // Return if any error is caught
                if (err)
                    return err
    
                database = dbClient.db('Test2')
                userCollection = database.collection('Users')
                dbResult = await userCollection.updateOne({
                    "generatedAddress": generatedAddress
                },
                    {
                        $set: {
                            "username": username,
                        }
                    })
    
                return dbResult.modifiedCount
            } catch (error) {
                console.log(error)
                return 0
            }
        }
    
        async updateTransactionHistory(creditOrDebit, amount, currentBalance, reason, generatedAddress) {
    
            // Some minor preprocessing
    
            let balance
            if (creditOrDebit == 'credit')
                balance = parseFloat(amount) + parseFloat(currentBalance)
            else
                balance = parseFloat(currentBalance) - parseFloat(amount)
    
            // Method that updates transaction history by adding the new block of transaction
            try {
                // Method that takes in generated address and sends all the details from DB
                err, dbClient = await mongo.connect(connectionString, { useUnifiedTopology: true }, (err, dbClient))
    
                // Return if any error is caught
                if (err)
                    return err
    
                database = dbClient.db('Test2')
                userCollection = database.collection('Users')
                let _ = await userCollection.updateOne({
                    "generatedAddress": generatedAddress
                }, {
                    $set: {
                        "currentBalance": balance
                    }
                })
                dbResult = await userCollection.updateOne({
                    "generatedAddress": generatedAddress
                },
                    {
                        $push: {
                            "transactionHistory": {
                                date: new Date(),
                                creditOrDebit: creditOrDebit,
                                amount: amount,
                                balance: balance,
                                reason: reason
                            }
                        }
                    })
    
                return dbResult.modifiedCount
            } catch (error) {
                console.log(error)
                return 0
            }
        }
    }
   
module.exports=WebServiceHandler;