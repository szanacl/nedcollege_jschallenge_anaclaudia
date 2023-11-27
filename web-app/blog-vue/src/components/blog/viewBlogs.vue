<template>
    <div class="container">
        <h2>All Blogs</h2>
        <div id="msg" v-html="message"></div>
        <div id="search-filter">
            <input type="text" v-model="search" placeholder="Search blogs">
        </div>
        <Loader v-if="isLoading" />
        <Blog v-for="blog in filteredBlogs" v-bind:key="blog.id" v-bind:blog="blog" />
        <div v-if="!isLoading && filteredBlogs.length == 0">
            <h3>No blogs found!</h3>
        </div>
    </div>
</template>

<script>
import blog from './blog';
import loader from '../partials/loader.vue';

export default {
    name: 'viewBlogs',
    components: {
        Blog: blog,
        Loader: loader
    },
    props:{},
    data() {
        return {
            blogs: [],
            search: '',
            isLoading: true,
            message: ''
        }
    },
    computed: {
        filteredBlogs() {
            return this.blogs.filter((blog) => {
                return blog.title.match(this.search);
            });
        }
    },
    methods:{
        listData(){
            this.isLoading = true;
            this.$blogService.getAll().then(response => {
                this.isLoading = false;
                if(response.erro){
                    //alert
                    console.log('deu erro');
                }else{
                    console.log(response);
                    this.blogs = response.data.map(function(object){
                        return {
                            id: object.id,
                            title: object.title,
                            content: object.content,
                            image: this+(object.image ? object.image.substring(1) : object.image),
                            url: object.url,
                            creat_at: object.creat_at
                        }
                    }, this.$server);

                }
            }).catch(response => {
                //alert
                console.log('deu erro'+response);
            })

        },
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
        }
    },
    mounted(){
        this.listData();
    }

}
</script>

<style scoped>
#search-filter {
    margin: 20px 0;
}

#search-filter input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}
</style>
