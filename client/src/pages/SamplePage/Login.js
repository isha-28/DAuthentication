import React,{Fragment,useEffect, useState,Component } from 'react';
import '../../app.css';
const Web3=require('web3');


const Login = () => {
    const [ID,setID] = useState("");
    const [chapter,setChapter] = useState("");
    const [description,setDescription] = useState("");
    const [s_date,setSdate] = useState("");
    const [e_date,setEdate] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        var web3Provider=null;
        var web3=null;
        if (window.ethereum) {
            web3Provider = window.ethereum;
            try {
            // Request account access
                await window.ethereum.enable();
                console.log(window.ethereum, web3Provider.selectedAddress);
            } catch (error) {
            // User denied account access...
                console.error("User denied account access");
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            web3Provider = window.web3.currentProvider;
             console.log(web3Provider);
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            console.log("No Web Client Detected, hence cannot log in");
        }
        web3 = new Web3(web3Provider);
        console.log('Web3 done!!');
        //Send XMLHttpRequest with parameters

        let xhr = new XMLHttpRequest();
        let json = JSON.stringify({
            address: web3Provider.selectedAddress,
        })

        xhr.open('POST', '/api/login');
        xhr.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
        xhr.send(json);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                document.body.innerHTML = xhr.response
            }
        }
      };
    const forsignup = async e => {
        e.preventDefault();
        var web3Provider=null;
        var web3=null;
        if (window.ethereum) {
            web3Provider = window.ethereum;
            try {
            // Request account access
                await window.ethereum.enable();
                console.log(window.ethereum, web3Provider.selectedAddress);
            } catch (error) {
            // User denied account access...
                console.error("User denied account access");
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            web3Provider = window.web3.currentProvider;
             console.log(web3Provider);
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            console.log("No Web Client Detected, hence cannot log in");
        }
        web3 = new Web3(web3Provider);
        console.log('Web3 done!!');
        //Send XMLHttpRequest with parameters
        let xhr = new XMLHttpRequest();
        let json = JSON.stringify({
            address: web3Provider.selectedAddress,
        })

        xhr.open('GET', '/api/signup');
        xhr.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
        xhr.send(json);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                document.body.innerHTML = xhr.response
            }
        }
    };
    return(
        <body>
        <div className="background">
        <center>
            <div className="transbox">
            
                <h1>Authentication System</h1>
                <br></br><br></br>
                <h2>Login here..</h2>
                    <button className="button" onClick={onSubmitForm}>Login</button>
                <br></br><br></br>
                <br></br>
                <h2>New User? Create New Account..</h2>
                <br></br>
                <button className="button" onClick={forsignup}>SignUp</button>
            
            </div>
            </center>
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
        </body>
    );
};

export default Login;


/*
Tabs - (flat list)
old achieve - year wise(student) - date wise already sorted june-may(faculty)  - collapsible
add achieve

button - genrate report - old achieve
form - sdate edate ---> pdf
*/ 