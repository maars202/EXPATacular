// require('dotenv').config();
// const express= require('express')
// const app =express()
// const routes = require('./routes')
// const Web3 = require('web3');
// const mongodb = require('mongodb').MongoClient
// const contract = require('truffle-contract');
// app.use(express.json())

// mongodb.connect(process.env.DB,{ useUnifiedTopology: true },(err,client)=>{
//     const db =client.db('Cluster0')
//     //home
//     routes(app,db)
//     app.listen(process.env.PORT || 8082, () => {
//         console.log('listening on port 8082');
//      })
// })


// ==============================================================================



require('dotenv').config();
const express= require('express')
const app =express()
// // middleware
// app.use(express.json());
// app.use(express.urlencoded());
const routes = require('./routes.js')
// const Web3 = require('web3');
const mongodb = require('mongodb').MongoClient;
// const contract = require('truffle-contract');
// const artifacts = require('./build/Inbox.json');


// // https://infura.io/docs/ipfs#section/Authentication/Using-NodeJS
// const https = require('https')

// const projectId = "f387475718234b9888d508cc78878952"
// const projectSecret = "fac6df7c0d6d432694557bcfb72b0192"

// const options = {
//   host: 'ipfs.infura.io',
//   port: 5001,
//   path: '/api/v0/pin/add?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn',
//   method: 'POST',
//   auth: projectId + ':' + projectSecret
// }

// let web3 = https.request(options, (res) => {
//   let body = ''
//   res.on('data', function (chunk) {
//     body += chunk
//   })
//   res.on('end', function () {
//     console.log(body)
//   })
// })
// web3.end()


// from web3.auto.infura.ropsten import w3
// export WEB3_INFURA_PROJECT_ID=YourProjectID
// export WEB3_INFURA_API_SECRET=YourProjectSecret
// w3.isConnected()



// const HDWalletProvider = require("@truffle/hdwallet-provider");
// // const mnemonic = "practice anger direct menu vanish song multiply bike thrive grain way master";
// const mnemonic = ""
// const localKeyProvider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/f387475718234b9888d508cc78878952", 0, 5)

// var web3 = new Web3(localKeyProvider);
// if (typeof web3 !== 'undefined') {
//     var web3 = new Web3(web3.currentProvider)
//   } else {
//     var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/f387475718234b9888d508cc78878952'))
// }
// const LMS = contract(artifacts)
// LMS.setProvider(web3.currentProvider)
// process.env.DB
const connectionstring = "mongodb+srv://dbUser:password_@cluster0.buuve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongodb.connect(connectionstring,{ useUnifiedTopology: true }, async(err,client)=>{
    const db = client.db('Cluster0');

    // blockchain stuff can ignore:

    // var accounts = await web3.eth.getAccounts();
    // const lms = await LMS.deployed();
    // const contract_address = "0xdCDeD4219a0570E4d73761E1A3D3D7E63B51061a"; //<-- inbox's address
    // const lms = await LMS.at(contract_address);
    // for remote nodes deployed on ropsten or rinkeby
    // app.use(express.json());
    // app.use(express.urlencoded());

    // console.log("LLLMMSS:", lms);
    // const balance = await web3.eth.getBalance(contract_address);
    // let account_balance = await web3.eth.getBalance("0x86b5e4d5cfB9988f2E6EB1A7d13FA776878fAE1c");
    // console.log("balance: ", account_balance);

    // console.log("ACCOUNT:", accounts[0]);
    // const HDWalletProvider = require("@truffle/hdwallet-provider");
    // const mnemonic = "practice anger direct menu vanish song multiply bike thrive grain way master";
    // const localKeyProvider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/f387475718234b9888d508cc78878952", 0, 5)
    // web3.setProvider(localKeyProvider);
    
    // const new_balance = await web3.eth.getBalance(accounts[0]);
    // var accounts = await web3.eth.getAccounts();
    // console.log("accountsssss: ", accounts);

    routes(app,db)
    const path = require('path');
    
    // const app = express();
    const port = process.env.PORT || 8080;
    
    // sendFile will go here
    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname, '/index.html'));
    })


    app.listen(5001|| 8082, () => {
       console.log('listening on port '+ (5001 || 8082));
     })



})

