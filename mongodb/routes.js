// const shortid = require('short-id')
// function routes(app, db){
//     app.post('/register', (req,res)=>{
//         let email = req.body.email
//         let idd = shortid.generate()
//         if(email){
//             db.findOne({email}, (err, doc)=>{
//                 if(doc){
//                     res.status(400).json({"status":"Failed", "reason":"Already registered"})
//                 }else{
//                     db.insertOne({email})
//                     res.json({"status":"success","id":idd})
//                 }
//             })
//         }else{
//             res.status(400).json({"status":"Failed", "reason":"wrong input"})
//         }
//     })
//     app.post('/login', (req,res)=>{
//         let email = req.body.email
//         if(email){
//             db.findOne({email}, (err, doc)=>{
//                 if(doc){
//                     res.json({"status":"success","id":doc.id})
//                 }else{
//                     res.status(400).json({"status":"Failed", "reason":"Not recognised"})
//                 }
//             })
//         }else{
//             res.status(400).json({"status":"Failed", "reason":"wrong input"})
//         }
//     })
//     app.post('/upload', (req,res)=>{
//         let buffer = req.body.buffer
//         let name = req.body.name
//         let title = req.body.title
//         if(buffer && title){

//         }else{
//             res.status(400).json({"status":"Failed", "reason":"wrong input"})
//         }
//     })
//     app.get('/access/:email/:id', (req,res)=>{
//         if(req.params.id && req.params.email){


//         }else{
//             res.status(400).json({"status":"Failed", "reason":"wrong input"})
//         }
//     })
// }
// module.exports = routes


// const projectId = "f387475718234b9888d508cc78878952"
// const projectSecret = "fac6df7c0d6d432694557bcfb72b0192"

const express= require('express');
const bodyParser = require("body-parser");
// const cv = require('opencv');
const fs = require("fs");
const shortid = require('short-id');
// const bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({ extended: true })
// var jsonParser = bodyParser.json()
const IPFS =require('ipfs-api');
// import cors from 'cors';
const cors = require('cors');
// const { create, urlSource } = require('ipfs-http-client')
// const ipfs = create()
const ipfs = IPFS({ host: 'ipfs.infura.io',
    port: 5001,protocol: 'https' });
// console.log("shortid: ", shortid);
// console.log("IPFS: ", IPFS);
// console.log("ipfs: ", ipfs);
//https://www.twilio.com/blog/add-cors-support-express-typescript-api
function routes(app, dbe, lms, accounts){
    // var urlencodedParser = bodyParser.urlencoded({ extended: false });
    // var jsonParser = bodyParser.json();
    // app.use(cors()); /* NEW */
    app.use(express.json());
    app.use(express.urlencoded());
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:5001'];
//     const options: cors.CorsOptions = {
//   origin: allowedOrigins
// };
const corsOptions = {
    origin: 'http://localhost:5001',
    optionsSuccessStatus: 200 // for some legacy browsers
  }

// app.use(cors(corsOptions));
    
    // app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(bodyParser.json());

    // app.use(function (req, res) {
    //     res.setHeader('Content-Type', 'text/plain')
    //     res.write('you posted:\n')
    //     res.end(JSON.stringify(req.body, null, 2))
    //   })

    let db= dbe.collection('music-users')
    let music = dbe.collection('music-store')
    app.post('/register', (req,res)=>{


        // res.setHeader('Content-Type', 'text/plain')
        // res.write('you posted:\n')
        // res.end(JSON.stringify(req.body, null, 2))



        console.log("Here is the body: ", req.body);
        let email = req.body.email;
        let password = req.body.password;
        // let email = "jane@gmail.com";
        let idd = shortid.generate();
        if(email && password){
            db.findOne({email, password}, (err, doc)=>{
                if(doc){
                    res.status(400).json({"status":"Failed", "reason":"Already registered"})
                }else{
                    db.insertOne({email, password})
                    res.json({"status":"success","id":idd})
                }
            })
        }else{
            console.log("email is still :", email);
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }
    })
    app.get('/', (req, res) => {
        // res.send("Welcome to the app maars its big you got this far already yayyy!");
        res.json({"status": "success", "message": "wlecomeee!"});
    })
    app.post('/login', (req,res)=>{
        // let email = "maars@gmail.com";
        let email = req.body.email;
        let password = req.body.password;
        // let password = "jane";
        if(email && password){
            db.findOne({email, password}, (err, doc)=>{
                if(doc){
                    console.log("doc is:", docaid)
                    res.json({"status":"success","id":doc.id})
                }else{
                    res.status(400).json({"status":"Failed", "reason":"Not recognised"})
                }
            })
        }else{
            res.status(400).json({"status":"Failed", "email received:":{email}, "reason":"wrong input"})
        }
    })

    app.post('/upload', async (req,res)=>{

        // var Buffer2 = require('buffer').Buffer;
        // var newBuffer = Buffer2.from('hello');
        // console.log("Buffer status: ", Buffer.isBuffer(newBuffer));

        // var buffer = Buffer2.from('hello this special song');
        let name = req.body.name;
        let title = req.body.title;
        // console.log(`in route fn: name: ${name}, title: ${title}`);

        let id = shortid.generate() + shortid.generate();
        if(name && title){
            // let ipfsHash = await ipfs.add(buffer).catch(err=>{
            //     console.log("error occurred at ipfsHash generation of buffer");
            // })
            // let hash = ipfsHash[0].hash;
            console.log("id generated shd be unique for each record: ", id);
            await music.insertOne({id, title,name}).then(
                res.json({"status":"success", id})
            )
            .catch(err=>{
                console.log("error isssss:", err);

                // if contract rules not followed:
                // error isssss: QmdrYU2owKdnoUuSy2H4ZxxR4Xg8SPGW1bJRGm9bPa3sF3 { code: -32000, message: 'execution reverted' }


                res.status(500).json({"status":"Failed", "reason":"Upload error occured"})
            })
        }else{
            console.log("wrong input");
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }
    })

    


    app.get('/access/:email', (req,res)=>{
        console.log("params: ", req.params);
        if(req.params.email){
            db.findOne({email: req.params.email}, (err,doc)=>{
                if(doc){
                    console.log("Found an entry!");
                    let data = music.find().toArray()
                    res.json({"status":"success", data})
                }
            })
        }else{
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }
    })
    app.get('/access/:email/hash/:id', (req,res)=>{
      let id = req.params.id
        if(req.params.id && req.params.email){
            db.findOne({email:req.params.email},(err,doc)=>{
                if(doc){
                    lms.getHash(id, {from: accounts[0]})
                    .then(async(hash)=>{
                        let data = await ipfs.files.get(hash);
                        console.log("retrieed the hash!: ", data[0].content);
                        res.json({"status":"success", data: data.content})
                    })
                }else{
                    res.status(400).json({"status":"Failed", "reason":"wrong input"})
                }
            })
        }else{
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }
    })

}

    

module.exports = routes



