<template>
  <div>
    <h1>Er polet åpent?</h1>
    <Answer />
  </div>
</template>

<script>
import Answer from './Answer.vue';
export default {
  name: 'IsItOpen',
  components: {
    Answer
  },
  mounted() {
    console.log('isitopen mounted');
  }
};
</script>

<style scoped></style>
