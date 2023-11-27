<template>
    <div id="form">
        <div class="row">
            <h2>Register Blogs</h2>
            <div v-show="isAlertMsg" id="msg" v-html="message"></div>
            <div class="col-sm">
                <form method="POSt" action="/" id="blogForm" v-on:submit.prevent="save">
                    <div class="col-6 form-group">
                        <label for="id">Código</label>
                        <input type="number" class="form-control" v-model="blog.id" id="id" name="id" disabled="disabled">
                    </div>
                    <div class="col-6 form-group">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" v-model="blog.title" id="title" name="title" placeholder="Enter a title">
                    </div>
                    <div class="col-6 form-group">
                        <label for="image">Image</label>
                        <input type="file" class="form-control-file" id="fileBlog" ref="fileBlog" name="fileBlog" v-on:change="loadImage($event)">
                    </div>
                    <div class="form-group">
                        <img v-bind:src="urlImage" v-show="urlImage!=''" alt="some text" width=300 height=200>
                        <!-- <video v-bind:src="urlImage" width="320" height="240" controls></video> -->
                    </div>
                    <div class="col-6 form-group">
                        <label for="content">Content</label>
                        <textarea class="form-control" v-model="blog.content" id="content" name="content" placeholder="Enter a content" rows="3" />
                    </div>
                    <div class="col-6 form-group">
                        <label for="url">Link</label>
                        <input type="text" class="form-control" v-model="blog.url" id="url" name="ulr">
                    </div>
                    <div class="col-12 form-inline text-center">
                        <button id="btn-submit" type="submt" class="btn btn-primary mr-sm-8">Submit Blog</button>
                        <button id="btn-cancel" type="button" class="btn btn-danger" v-on:click="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import loader from '../partials/loader.vue';
export default {
    name: 'AddBlog',
    components: {
        Loader: loader

    },
    data() {
        return {
            blog: {
                id: null,
                title: '',
                content: '',
                fileBlog: '',
                image: '',
                url: ''
            },

            submitted: false,
            isLoading: true,
            isAlertMsg: false,
            urlImage: '',
            fileBlog: '',
            registerFormData: null,
            message: '',
            id: this.$route.params.id,

        }
    }, methods: {
        viewMsgAlert(msg, type){
            let data = "";
            if(type == "success"){
                data =`<div class='alert alert-success' roles= 'alert'>
                    <strong>${msg}</strong>
                </div>`
            }else if(type == "error"){
                data =`<div class='alert alert-danger' roles= 'alert'>
                    <strong>${msg}</strong>
                </div>`
            }
            this.message = data;
        },
        cleanMsgAlert(){
            this.message = '';
        },
        loadImage(){
            if(this.$refs.fileBlog.files.lenght != 0){
                const read = new FileReader();
                const fileBlog = this.$refs.fileBlog.files[0];
                read.readAsDataURL(fileBlog);
                read.onload = () => {
                    const url = read.result;
                    this.urlImage = url;
                    this.fileBlog = fileBlog;
                }
            }
        },
        previewBlogFun() {
            if (this.blog.title == '' || this.blog.content == '') {
                return;
            }
            this.previewBlog.title = this.blog.title;
            this.previewBlog.content = this.blog.content;
            this.previewBlog.image = this.blog.image;
            this.previewBlog.url = this.blog.url;
        },
        save(){
            this.registerFormData = new FormData();
            this.registerFormData.append('title',this.blog.title);
            this.registerFormData.append('content',this.blog.content);
            this.registerFormData.append('fileBlog',this.$refs.fileBlog.files[0]);
          //  this.registerFormData.append('image',(this.$refs.fileBlog[0] != undefined ? '': this.blog.image));
            this.registerFormData.append('url',this.blog.url);
            this.registerFormData.append('user_id', 1)

            if(this.blog.id > 0){
                this.edit(this.registerFormData)
            }else{
               this.register(this.registerFormData);
            }
        },
        register(registerFormData){
            this.isAlertMsg =true;
            this.$blogService.addPost(registerFormData).then(response => {
                if(this.verifyRespHttp(response)){
                    this.clearForm();
                    this.$router.push('/');
                }
            }).catch(response => {
                this.viewMsgAlert(response.msg +" Error when executing registration operation.",  "error")
            })
        },
        verifyRespHttp(resp){
            if(resp.erro){
                this.viewMsgAlert(resp.msg,  "error")
                return false;
            }else{
                if(resp.msg != null){
                    this.viewMsgAlert(resp.msg,  "success")
                    return true
                }
            }
        },
        prepareFormEdit(){
            this.cleanMsgAlert();
                this.$blogService.getId(this.id).then(response => {
                    if(!this.verifyRespHttp(response)){
                        this.blog.id = response.data[0].id;
                        this.blog.title = response.data[0].title;
                        this.blog.content = response.data[0].content;

                        this.blog.url = response.data[0].url;
                        if(response.data[0].image != null){
                            this.blog.image =response.data[0].image;
                            this.urlImage = this.$server+response.data[0].image.substring(1);
                        }
                    }
                }).catch(response =>{
                    this.viewMsgAlert(response.msg, 'error')
                })
        },
        edit(registerFormData){
            this.isAlertMsg =true;
            this.$blogService.update(registerFormData).then(response => {
                if(this.verifyRespHttp(response)){
                    this.clearForm();
                    this.$router.push('/');
                }
            }).catch(response => {
                this.viewMsgAlert(response.msg +" Error when executing updation operation.",  "error")
            })
        },

        clearForm() {
            let formHtml = document.getElementById('blogForm');
            formHtml.reset();
            this.blog.title = '';
            this.blog.content = '';
            this.blog.image = '';
            this.blog.url = '';
            this.blog.fileBlog ='',
            this.urlImage = '';
            this.fileBlog = '';
            this.message = '';
            this.registerFormData = new FormData();
            this.isAlertMsg =false;

        },
        cancel(){
            this.cleanMsgAlert();
            this.clearForm();
            this.message;
            this.$router.push('/');
        }
    },

    mounted(){
        this.cleanMsgAlert();
        this.clearForm();
        if(this.id !== '0'){
            this.prepareFormEdit(this.id);
        }
    }

}
</script>

<style scoped>
#add-blog {
    margin: 20px auto;
    max-width: 500px;
}

input,
textarea {
    display: block;
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
}

textarea {
    height: 150px;
}

#blog-categories {
    display: flex;
    justify-content: start;
    margin-bottom: 10px;
}

.blog-category {
    display: flex;
    justify-content: start;
    margin-right: 10px;
}



.buttons {
    display: flex;
    justify-content: center;
}

.success {
    background-color: #4CAF50;
    padding: 10px;
    text-align: center;
}

.success h3 {
    margin: 0;
    color: #fff;
}

#preview-section {
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
}
</style>
