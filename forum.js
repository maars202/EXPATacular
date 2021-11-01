import axios from "axios";
const app = Vue.createApp({
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        
    },
    created(){
        
    }
});

app.component('posts',{
    data(){
        return{
            latestPosts : [],
        }
    },
    emits: [] ,
    props: [],
    template: `
    <div>
        <div class="card" v-if ='latestPosts.length == 0'>
            <div class="card-header">
                {{latestPosts.length}}
            </div>
            <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
        </div>
    </div>`,
    created(){
            'https://login-backend1.herokuapp.com/api/users/latest_post'
            // 'http://localhost:5000/api/users/latest_post'
            var config = {
                method: 'get',
                url: 'https://login-backend1.herokuapp.com/api/users/latest_post',
                Headers: { 
                    'Access-Control-Allow-Origin' : "*",
                    'Content-Type':'application/json',
                }
            };
            
            this.latestPosts = [];
            console.log(this.latestPosts);

            axios(config)
            .then(function (response) {
                console.log(this.latestPosts);
                this.latestPosts = [];
                // const myHeaders = new Headers();
                //console.log("here:, ", response.data);

                var data  = response.data;

                for(i in data) {
                    var title = data[i].name;
                    var id = data[i]._id;
                    id = 'Annoynamous ' + id.slice(3,8);
                    var content = data[i].content ; 
                    var date = data[i].date ;

                    this.latestPosts.push({
                        id: id,
                        title: title,
                        content: content,
                        date: date,
                    })
                }
                console.log(this.latestPosts)
                //result = JSON.stringify(response.data)
                //document.getElementById("axios").innerText = result;
                //console.log(result);
            })
            .catch(function (error) {
                console.log(error);
        });
    }

    
}) 

const vm = app.mount("#app");