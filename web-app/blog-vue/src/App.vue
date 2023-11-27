<template>
  <div id="app">
    <NavbarApp />
    <div class="container">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import navbarApp from './components/navbar/navbar';

export default {
  name: 'App',
  components: {
    NavbarApp: navbarApp
  }

}
</script>

<style>

#app {
  font-family: 'Trebuchet MS';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
  color: #333;
}


.btn {
  padding: 8px;

  margin-right: 10px;

  padding: 10px 20px;
}



.text-blod {
  font-weight: bold;
}
</style>
