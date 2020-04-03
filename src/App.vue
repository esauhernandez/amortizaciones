<template>
  <div id="app" style="background: #0055a0; height: 100vh">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <Principal/>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Principal from './components/Principal.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    Principal
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
