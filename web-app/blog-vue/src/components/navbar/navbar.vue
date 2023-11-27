<template>
     <nav class="navbar bg-dark border-bottom border-body">
      <div >
        <ul class="nav nav-pills">
            <li class="nav-item">
                <router-link class="nav-link" to="/" exact>Blogs</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/add" exact>Add a new blog</router-link>
            </li>
        </ul>
      </div>
      <div>
            <router-link class="btn btn-outline-light" to="/" tag="button">Login</router-link>
            <router-link class="btn btn btn-light" to="/" tag="button">Sign-up</router-link>
      </div>
    </nav>
</template>

<script>
export default {
    name: 'NavbarApp'
}
</script>

<style scoped>
.navbar {
    background-color: rgb(195, 124, 246) !important;
}
.nav-link {
    color: #eee;
}
.nav-pills {
    color: #eee !important;
}
.nav{
    color: #343131 !important;
}

</style>