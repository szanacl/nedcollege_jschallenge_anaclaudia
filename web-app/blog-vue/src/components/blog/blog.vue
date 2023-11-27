<template>
    <router-link class="normal" v-bind:to="'/blog/' + blog.id">
        <div id="blog-item">
            <h2 v-rand-color>{{ blog.title | to - uppercase }}</h2>
            <img v-bind:src="blog.image" alt="some text" width=300 height=200>
            <p>{{ blog.content | snippet }}</p>
            <router-link class="btn btn-primary mr-sm-8" v-bind:to="'/add/' + blog.id" tag="button">Edit</router-link>
            <button id="btn-cancel" type="button" class="btn btn-danger">Delete</button>

        </div>
    </router-link>
</template>

<script>
export default {
    name: 'ViewBlogs',
    components: {
    },
    props: {
        blog: {
            type: Object,
            required: true
        }
    }, filters: {
        toUppercase(value) {
            return value.toUpperCase();
        }
    },

}
</script>

<style scoped>
#blog-item {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
}

/*remove link styling*/
.normal {
    text-decoration: none;
    color: inherit;

}
</style>
