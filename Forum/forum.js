const app = Vue.createApp({
    data() {
        return {
            latestPosts2: [],
            data : null ,
        }
    },
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
                
            axios(config)
                .then(function (response) {
                    // const myHeaders = new Headers();
                    //console.log("here:, ", response.data);
                this.data  = response.data;
                
                })
                .catch(function (error) {
                    console.log(error);
                })
    },
    
    methods:{
        getPosts(){
            for(i in this.data) {
                var title = this.data[i].name;
                var id = this.data[i]._id;
                id = 'Annoynamous ' + id.slice(3,8);
                var content = this.data[i].content ; 
                var date = this.data[i].date ;

                this.latestPosts2.push({
                    id: id,
                    title: title,
                    content: content,
                    date: date,
                })
            }
            console.log(this.latestPosts2);
        }
    }
    
});


app.component('posts',{
    emits: [] ,
    props: ['posts'],
    template: `
    <div>
        <div class="card" v-if ='latestPosts.length == 0'>
            <div class="card-header">
                {{getPosts()}}
            </div>
            <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
        </div>
    </div>`,
    data(){
        return{
            latestPosts : 'hello',
        }
    },
    methods: {
        getPosts(){
            console.log(this.latestPosts);
        }
    },
    
}) 

const vm = app.mount("#app");