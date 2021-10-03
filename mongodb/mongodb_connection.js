require('dotenv').config();
const express= require('express')
const app =express()
// const routes = require('./routes')
const Web3 = require('web3');
// const mongodb = require('mongodb').MongoClient
// const contract = require('truffle-contract');
app.use(express.json())


// if (typeof web3 !== 'undefined') {
//     var web3 = new Web3(web3.currentProvider)
//   } else {
//     var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/f387475718234b9888d508cc78878952'))
// }
// const LMS = contract(artifacts)
// LMS.setProvider(web3.currentProvider)
// mongodb.connect(process.env.DB,{ useUnifiedTopology: true }, async(err,client)=>{
//     const db =client.db('Cluster0')
//     const accounts = await web3.eth.getAccounts();
//     const lms = await LMS.deployed();
//     //const lms = LMS.at(contract_address) for remote nodes deployed on ropsten or rinkeby
//     routes(app,db, lms, accounts)
//     app.listen(process.env.PORT || 8082, () => {
//        console.log('listening on port '+ (process.env.PORT || 8082));
//      })
// })



const {MongoClient} = require('mongodb')
async function main(){

    // edit accordingly:
    password = "password_"
    database_name = "myFirstDatabase"
    

    const uri = `mongodb+srv://dbUser:${password}@cluster0.buuve.mongodb.net/${database_name}?retryWrites=true&w=majority`
    const client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    try {
        await client.connect();
        const dbe = client.db('Cluster0')

        // name of collections from mongodb.. edit accordingly:
        let db= dbe.collection('music-users')
    let music = dbe.collection('music-store')


 console.log("Connection made successfully!!!");

//  Data about to be inserted... edit accordingly:
 username = "nana1"
 password = "passworddd1"
 

db.insertOne({username, password})

// .then(res => {console.log(`${username} & ${password} pair inserted successfully`)}).catch(err =>{
//      console.log(`${username} & ${password} pair UNSUCCESSFUL`)
//  })
    } catch (e) {
        console.log("ERROR ABOUT TO BE PRINTED:");
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);