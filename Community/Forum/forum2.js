function get_latest_posts() {
  var info = [];
  var str = ``;
  ("https://login-backend1.herokuapp.com/api/users/latest_post");
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
      var likes = response.data.likes ;

       var date = response.data.date;
        dateStr = new Date(date)
        date = JSONDateWithTime(dateStr);

      var user = "Annoynamous " + id.slice(3, 8);
      str += `
      <div class ="border border-secondary" style='background-color: rgb(245, 245, 245)' >
      <div class='row' style ='color:blue ; margin-left:10px ;text-decoration: underline ; padding-top:10px'>
      ${user}
      </div>
        <p style='margin-left:10px ; margin-right:10px ; margin-top:10px ; background-color: white ; padding: 10px'  class ="border">${comment}</p>
         <p class="text-muted ;" style='text-align:right ; margin-right: 10px ; margin-left:10px'>
              
              <span style='float:left'>
              <button type="button" class="btn btn-outline" id = '${id}' onclick="increase(this)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  style ='color:red ; margin-right:15px' class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
              </svg>
              <span id='clicks${id}'>${likes}</span>
              </button>
              </span>

          ${date}</p>
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
          for(each_response of response.data){
              var comment = each_response.content ;
              var id = each_response._id;
              var likes = each_response.likes ;
            
              var date = each_response.date;
              dateStr = new Date(date)
              date = JSONDateWithTime(dateStr);
              
              //let index = date.indexOf("T");
              //date = date.slice(0, index);
              
              var user = "Annoynamous " + id.slice(3, 8);
              str += `
              <div class ="border border-secondary" style='background-color: rgb(245, 245, 245)' >
              <div class='row' style ='color:blue ; margin-left:10px ;text-decoration: underline ; padding-top:10px'>
              ${user}
              </div>
              <p style='margin-left:10px ; margin-right:10px ; margin-top:10px ; background-color: white ; padding: 10px'  class ="border">${comment}</p>
              
              <p class="text-muted ;" style='text-align:right ; margin-right: 10px ; margin-left:10px'>
              
              <span style='float:left'>
              <button type="button" class="btn btn-outline" id = '${id}' onclick="increase(this)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  style ='color:red ; margin-right:15px' class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
              </svg>
              <span id='clicks${id}'>${likes}</span>
              </button>
              </span>

              ${date}</p>

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

function JSONDateWithTime(dateStr) {
    var d = dateStr ;
    var m, day;
    m = d.getMonth() + 1;
    if (m < 10)
        m = '0' + m
    if (d.getDate() < 10)
        day = '0' + d.getDate()
    else
        day = d.getDate();
    var formattedDate = d.getFullYear() + "-" + m + "-" + day;
    var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    hours = (hours <= 12) ? hours : hours - 12 ;
    var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();

    if(d.getHours() >= 12 && d.getHours() != 24){
      var end = 'pm'
    }
    else{
      var end = "am"
    }
    var formattedTime = hours + ":" + minutes;
    formattedDate = formattedDate + " " + formattedTime + end;
    return formattedDate;
}


function increase(btninfo){
 var btnId = btninfo.id ;
 btninfo.onclick = "";

 var showClick = document.getElementById(`clicks${btnId}`)
 var numberOfClicks = showClick.innerText ;
 showClick.innerText = parseInt(numberOfClicks) + 1 ;

  var id = btnId;
  var str = `` ;
  
  var data = JSON.stringify({
        '_id': id ,
  })
    
  var config = {
      method: "post",
        url: "https://login-backend1.herokuapp.com/api/forum/likecomment",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
    };
    
    axios(config)
        .then(function (response) {
          //console.log(response.data);
                
        })
        .catch(function (error) {
          console.log(error);
    });

}

