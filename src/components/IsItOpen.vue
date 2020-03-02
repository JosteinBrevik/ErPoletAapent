<template>
  <div>
    <h1>Er polet åpent?</h1>
    <div v-if="loaded">
      <p>{{ this.lat }} {{ this.long }}</p>
    </div>
    <div v-if="!loaded">Loading</div>
    <Answer />
  </div>
</template>

<script>
import Answer from './Answer.vue';
import { getLocation } from 'vue-browser-geolocation';
export default {
  name: 'IsItOpen',
  components: {
    Answer
  },
  data() {
    return {
      lat: '',
      long: '',
      loaded: false
    };
  },
  beforeMount() {
    this.getBounds();
  },
  mounted() {
    console.log('isitopen mounted');
  },
  methods: {
    async getBounds() {
      console.log('trying to fetch loc');
      try {
        const coordinates = await this.$getLocation({
          enableHighAccuracy: true
        });
        const { lat, lng } = coordinates;
        console.log('fetched loc: lat', lat, 'long:', lng);
        this.lat = lat;
        this.long = lng;
        this.loaded = true;
      } catch (error) {
        console.log('failed', error);
        this.loaded = false;
      }
    }
  }
};
</script>

<style scoped></style>
