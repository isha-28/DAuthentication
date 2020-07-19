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

const BbAS = contract(BbASJSON)
BbAS.setProvider(web3.currentProvider)
BbAS.setNetwork(networkID)

let database
let dbResult
let userCollection
let dbClient
let err
let timeOutDelay = 2000

    // Private Blockchain Handler
    
    class PrivateBlockchainHandler {
    
        // Sign Up new user
    
        async signupUser(realAddress) {
    
            // Get accounts of current network for calling
            let accounts = await web3.eth.getAccounts()
    
            // Get Deployed address of Contract
            let BbASInstance = await BbAS.deployed()
            let BbASAddress = BbASInstance.address
            // console.log(accounts, BbASAddress)
    
            var _ = await BbASInstance.signup(realAddress, { from: accounts[0] })
            var generatedAddress = await BbASInstance.getGeneratedAddress(realAddress)
    
            // console.log("Original Address  :", realAddress)
            // console.log("Generated Address :", generatedAddress)
    
            // Insert Username, GeneratedAddress, Balance and Transaction History in Mongo DB
            // TBD
    
            return generatedAddress
        }
    
        // Log in user
        async loginUser(realAddress) {
    
            // Check if user has account or not
            try {
                console.log("No error");
                let BbASInstance = await BbAS.deployed();
                var generatedAddress = await BbASInstance.getGeneratedAddress(realAddress);
                console.log("Found generated address for real address : ", generatedAddress);
                var allRealAddressesLinked = await BbASInstance.getGeneratedToRealMappingAddresses(generatedAddress);
                console.log("All real addresses for", generatedAddress, "are :", allRealAddressesLinked);
    
                // Get Balance, Transaction History, Username
    
                // Return Balance, Transaction History, Username, Generated Address and allRealAddressesLinked
                return [generatedAddress, allRealAddressesLinked]
            } catch (err) {
                console.log("Erorr");
                console.log(err);
                return false
            }
        }
    
        // Linking 2 accounts of user
    
        async linkAccounts(realAddress, newRealAddress) {
    
            // Call link function
            try {
                let accounts = await web3.eth.getAccounts()
                let BbASInstance = await BbAS.deployed()
                var _ = await BbASInstance.linking(realAddress, newRealAddress, { from: accounts[1] })
                var generatedAddress = await BbASInstance.getGeneratedAddress(realAddress)
                var allRealAddressesLinked = await BbASInstance.getGeneratedToRealMappingAddresses(generatedAddress)
                // console.log("Have both of them added?", allRealAddressesLinked)
                return allRealAddressesLinked
            }
            catch (err) {
                console.log(err)
                return false
            }
        }
    }
    

module.exports=PrivateBlockchainHandler;