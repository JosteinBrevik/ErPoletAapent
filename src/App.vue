<template>
  <div id="app">
    <PermissionCheck>
      <StoreManager />
    </PermissionCheck>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StoreManager from "./components/StoreManager.vue";
import PermissionCheck from "./components/PermissionCheck.vue";
import axios from "axios";

export default Vue.extend({
  name: "app",
  components: {
    StoreManager,
    PermissionCheck
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
  min-height: 100vh;
  margin: 0 !important;
  background: #222;
}
</style>
