function get_latest_posts() {
  var info = [];
  var str = ``;
  ("https://login-backend1.herokuapp.com/api/users/latest_post");
  // 'http://localhost:5000/api/users/latest_post'
  var config = {
    method: "get",
    url: "https://login-backend1.herokuapp.com/api/users/latest_post",
    Headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      // const myHeaders = new Headers();
      //console.log("here:, ", response)
      result = response.data;
      //document.getElementById("axios").innerText = result;
      //console.log(result);
      for (i in result) {
        var title = result[i].name;
        var id = result[i]._id;
        shortId = "Annoynamous " + id.slice(3, 8);
        var content = result[i].content;
        var date = result[i].date;

        let index = date.indexOf("T");
        date = date.slice(0, index);

        info.push({
            id : id ,
          shortId: shortId,
          title: title,
          content: content,
          date: date,
        });
      }

      //console.log(info)

      for (i of info) {
        str += ` 
            
        <div class="card">
               <h5 class="card-header">${i.title}</h5>
            <div class="card-body">
                  <h6 class="card-title">${i.shortId}</h6>
                  <p class="card-text">${i.content}</p> 
                  <p class="card-text text-muted float-end">${i.date}</p>
                
                <button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#comment${i.id}" style ='color:grey' onclick='getComments(this)' id ='${i.id}'>Comments</button>

               <div class="collapse" id="comment${i.id}">

               <div class = 'row'>
               <textarea placeholder ='Leave a comment...' id ='input${i.id}'></textarea> 
               </div>

               <button type = 'button' id ='${i.id}' class = 'btn btn-success my-2' onclick='postComments(this)'>
               Post
               </button>

               <div class = 'row'>
               <strong style ='margin-bottom:10px'>Comments:</strong>
               <div id ='comment${i.id}'>
               </div>
               </div>

               </div>

            </div>
        </div>
        </br>
           `;
      }

      var show = document.getElementById("results");
      show.innerHTML = str;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function postComments(info) {
    var str = `` ;
    var btn = info ;
    var idd = btn.id ;
    var inputId = 'input' + idd;
    //console.log(inputId)
    var commentResult = document.getElementById(`comment${idd}`) ;
    var input = document.getElementById(inputId).value;
    //console.log(input)
    //console.log(commentResult)
    //console.log(comment)
    
    var data = JSON.stringify({
    'thread_id': idd ,
    'content' : input,
    })

  var config = {
    method: "post",
    url: "https://login-backend1.herokuapp.com/api/forum/postquestion",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      //console.log(response.data);
      var comment = response.data.content ;
      var id = response.data._id;

      var date = response.data.date;
      let index = date.indexOf("T");
      date = date.slice(0, index);

      var user = "Annoynamous " + id.slice(3, 8);
      str += `
      <div class ="border border-secondary" style='background-color: rgb(245, 245, 245)' >
      <div class='row' style ='color:blue ; margin-left:10px ;text-decoration: underline ; padding-top:10px'>
      ${user}
      </div>
        <p style='margin-left:10px ; margin-right:10px ; margin-top:10px ; background-color: white ; padding: 10px'  class ="border">${comment}</p>
        <p class="text-muted ;" style='text-align:right ; margin-right: 10px'>${date}</p>
        </div>
        </br>
      `
      commentResult.innerHTML += str ;
    })
    .catch(function (error) {
      console.log(error);
    });
}


function getComments(info){
    var id = info.id ;
    var str = `` ;
    var commentResult = document.getElementById(`comment${id}`) ;

    var data = JSON.stringify({
        'thread_id': id ,
    })
    
    var config = {
        method: "post",
        url: "https://login-backend1.herokuapp.com/api/forum/getcomments4quest",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
    
    axios(config)
        .then(function (response) {
          //console.log(response.data);
          for(each_response of response.data){
              //console.log(each_response.content);
              var comment = each_response.content ;
              var id = each_response._id;

              var date = each_response.date;
              let index = date.indexOf("T");
              date = date.slice(0, index);

              var user = "Annoynamous " + id.slice(3, 8);
              str += `
              <div class ="border border-secondary" style='background-color: rgb(245, 245, 245)' >
              <div class='row' style ='color:blue ; margin-left:10px ;text-decoration: underline ; padding-top:10px'>
              ${user}
              </div>
              <p style='margin-left:10px ; margin-right:10px ; margin-top:10px ; background-color: white ; padding: 10px'  class ="border">${comment}</p>
              <p class="text-muted ;" style='text-align:right ; margin-right: 10px'>${date}</p>
              </div>
              </br>
              `
          }
          commentResult.innerHTML += str ;
        })
        .catch(function (error) {
          console.log(error);
    });

}