const app = Vue.createApp({
    data() {
        return {
            postContent : '',
            postTitle : '',
            errorMsg: null,
            successMsg: null,
        }
    },
    methods: {
        post_review() {
            //console.log("post")
            // 'https://login-backend1.herokuapp.com/api/users/post_review'
            // 'http://localhost:5000/api/users/post_review'
            //name = document.getElementById("post_title").value
            //content = document.getElementById("post_content").value
            var title = this.postTitle; 
            var content = this.postContent;

            console.log(content);
            console.log(title);
            
            // console.log("name: ", content.length)
            // console.log("content: ", content)
            if (title.length == 0 || content.length == 0) {
                this.successMsg = null;
                this.errorMsg = '';

                if (title.length == 0) {
                    this.errorMsg += `Post review: <strong>Title</strong> has not been filled </br>`
                }
                if (content.length == 0) {
                    this.errorMsg += `\nPost review: <strong>Content</strong> has not been filled. Please type something`
                }
               //document.getElementById("error_msg").innerText = error_msg;
            } else {
                this.errorMsg = null ;
                var config = {
                    method: 'post',
                    url: 'https://login-backend1.herokuapp.com/api/users/post_review',
                    Headers: {
                        'Access-Control-Allow-Origin': "*",
                        'Content-Type': 'application/json',
                    },
                    data: {
                        name: title,
                        content: content
                    }
                };

                axios(config)
                    .then(function (response) {
                        // const myHeaders = new Headers();
                        console.log("here:, ", response)
                        result = JSON.stringify(response.data)
                        //document.getElementById("axios").innerText = result;
                        console.log(result);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                this.successMsg = `<strong>Post Published</strong>`
            }
        },
        removeAll(){
            this.errorMsg = null;
            this.successMsg = null;
            this.postContent = '';
            this.postTitle = '';
        }
    },
    computed: {

    },
});
/* 
app.component('login',{
    data(){
        return{

        }
    },
    emits: [] ,
    props: [],
    template: `<div>
    </div>`,
    methods: {

    },
    computed: {

    },
    created(){

    },
}) */


const vm = app.mount("#app");