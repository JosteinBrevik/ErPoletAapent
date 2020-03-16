<template>
  <div id="app">
    <StoreManager />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StoreManager from "./components/StoreManager.vue";

export default Vue.extend({
  name: "app",
  components: {
    StoreManager
  }
});
</script>

<style>
body {
  margin: 0 !important;
  background-color: #222222;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #cccccc;
  min-width: 100vw;
  min-height: 100vh;
  margin: 0 !important;
  background: linear-gradient(145d, #424242, #242424);
}
</style>
