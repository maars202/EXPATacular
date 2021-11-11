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
           
            var title = this.postTitle; 
            var content = this.postContent;

            if (title.length == 0 || content.length == 0) {
                this.successMsg = null;
                this.errorMsg = '';

                if (title.length == 0) {
                    this.errorMsg += `Post review: <strong>Title</strong> has not been filled </br>`
                }
                if (content.length == 0) {
                    this.errorMsg += `\nPost review: <strong>Content</strong> has not been filled. Please type something`
                }
            } else {
                this.errorMsg = null ;
                var config = {
                    method: 'post',
                    url: 'https://expatacular.herokuapp.com/api/users/post_review',
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
                        console.log("here:, ", response)
                        result = JSON.stringify(response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                this.successMsg = `<strong>Post Published</strong>`
                this.postContent = '';
                this.postTitle = '';
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


const vm = app.mount("#app");
