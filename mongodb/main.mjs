// var app = new Vue({
//     el: "#app",
//     data: {
//       product: "bunny",
//       candy: "rabbit"
//     }
//   })


// var XMLHttpRequest = require('xhr2');
// var xhr = new XMLHttpRequest();
// console.log("becuase im happy");
// var request = new XMLHttpRequest();
// request.open("GET", "http://localhost:5001/");
// request.send();
// request.onload = () => {
//     // console.log(request);;
//     if (request.status == 200){
//         console.log(JSON.parse(request.response));
//     } else {
//         console.log(`error ${ request.status} ${request.statusText}`)
//     }
// }


// for es6 to use import instead of require only: change file extension to mjs!!!
import fetch from "node-fetch";
// let url = "http://localhost:5001/";
// let response = await fetch(url).then(
//   console.log(`response undefined? : ${response}`)
// );
// // console.log(`response undefined? : ${response}`);
// if (response) { // if HTTP-status is 200-299
//   // get the response body (the method explained below)
//   let json = await response.json().then(
//     console.log(`json response: ${json}`)
//   );
  
// } else {
//   alert("HTTP-Error: " + response.status);
// }


async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    console.log(`loaded!: ${json.status}`);
    return json;
  }
  // else{
  //   // throw new Error(400);
  //   return response.status
  // }
  throw new Error(400);
  
}



// making calls to asynchronous functions:


// loadJson("http://localhost:5001/")
//   .then(res => {
//     console.log(`response isss: ${res.status} message: ${res.message}`);
//   }).catch(err => {
//     console.log(`errorrrr: ${err}`);
//   }); // Error: 404 (4)

// header("Access-Control-Allow-Origin:*");


// // var axios = require('axios');
// import axios from 'axios';
// var config = {
//   method: 'get',
//   url: 'http://localhost:5001/',
//   headers: { }
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });



async function postFetch(url, body) { // (1)
  let response = await fetch(url, {
    method: 'POST',
    'url': 'http://localhost:5001/',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
});
console.log("not related to response so will run first while waiting for asynchronous fetch method to execute before it!")
  if (response.status == 200) {
    let json = await response.json(); // (3)
    console.log(`loaded!: ${json.status}`);
    return json;
  }

  throw new Error(400);
}


// // non async functions cannot have await 
// function postFetch_2(url, body) { // (1)
//   let response = await fetch(url, {
//     method: 'POST',
//     'url': 'http://localhost:5001/',
//   'headers': {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(body)
// });
// console.log("not related to response so will run first while waiting for asynchronous fetch method to execute before it!")
//   if (response.status == 200) {
//     let json = await response.json(); // (3)
//     console.log(`loaded!: ${json.status}`);
//     return json;
//   }

//   throw new Error(400);
// }



// processing input from commandline:
import { argv } from 'process';

// print process.argv
let arguments_ = [];

argv.forEach((val, index) => {
  // console.log(`${index}: ${val}`);
  if (index >= 2) {
    arguments_.push(val)
  }
});
// console.log(arguments_)

if (arguments_.length < 2) {
  console.log(`You only entereed ${arguments_.length} Please enter more than 1 arguments
  in the format "node main.mjs [singer_name] [song_title]"`)
  process.exit(1)
}



var name = arguments_[0]
var song_title = arguments_[1]
let body_ = {
  "name": name,
  "title": song_title
}

console.log(`name is : ${name}`);
console.log(`song is : ${song_title}`);


postFetch("http://localhost:5001/upload", body_).then(res => {
  console.log(`Song has been registered successfully with : response -- ${res.status} ... message -- ${res.id}`);
}).catch(err => {
  console.log(`Song registration unsuccessful -- please try again... ${err}`)
})





// var name_upload = document.getElementById("name");
// var title_upload = document.getElementById("title");
// console.log(`name_upload: ${name_upload}`);
// console.log(`title_upload: ${title_upload}`);

// console.log(`name_upload: ${name}`);
// console.log(`title_upload: ${title}`);


// var name_upload = name;
// var title_upload = title;



// this only works with require which cannot happen in mjs file:
// // var request = require('request');
// var options = {
//   'method': 'GET',
//   'url': 'http://localhost:5001/',
//   'headers': {
//   }
// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });

// // requests for other calls:
// var options = {
//     'method': 'POST',
//     'url': 'http://localhost:5001/upload',
//     'headers': {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "name": "name_upload2",
//       "title": "title_upload2"
//     })
  
//   };
//   request(options, function (error, response) {
//     if (error) throw new Error(error);
//     console.log(response.body);
//   });
  
