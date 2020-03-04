<template>
  <div id="app">
    <IsItOpen />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IsItOpen from "./components/IsItOpen.vue";

export default Vue.extend({
  name: "app",
  components: {
    IsItOpen
  }
});
</script>

<style>
body {
  margin: 0 !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #222222;
  color: #dddddd;
  padding-top: 60px;
  min-width: 100vw;
  min-height: 100vh;
  margin: 0 !important;
}
</style>
