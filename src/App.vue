<template>
  <div id="app">
<!--    <nav-bar />-->
    <router-view/>
  </div>
</template>

<script>
import NavBar from "./components/custom/Navbar";
export default {
  name: 'App',
  components: {NavBar}
}
</script>

<style>
#app {
  margin: 0;
}
</style>
