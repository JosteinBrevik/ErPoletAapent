<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <IsItOpen />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IsItOpen from './IsItOpen.vue';

export default Vue.extend({
  name: 'HelloWorld',
  components: {
    IsItOpen
  },
  props: {
    msg: String
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
