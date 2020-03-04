<template>
  <div>
    <h1>Er polet åpent?</h1>
    <div v-if="loaded">
      <StoreManager v-bind="{ ...this.coords }" />
      <p>{{ this.coords.lat }} {{ this.coords.lng }}</p>
    </div>
    <div v-if="!loaded">Loading</div>
  </div>
</template>

<script>
import StoreManager from "./StoreManager.vue";
import { getLocation } from "vue-browser-geolocation";
export default {
  name: "IsItOpen",
  components: {
    StoreManager
  },
  data() {
    return {
      coords: {
        lat: "",
        long: ""
      },
      loaded: false
    };
  },
  beforeMount() {
    this.getBounds();
  },
  mounted() {
    console.log("isitopen mounted");
  },
  methods: {
    async getBounds() {
      console.log("trying to fetch loc");
      try {
        const coordinates = await this.$getLocation({
          enableHighAccuracy: true
        });
        this.coords = coordinates;
        console.log("fetched coords:", coordinates);
        this.loaded = true;
      } catch (error) {
        console.log("failed", error);
        this.loaded = false;
      }
    }
  }
};
</script>

<style scoped></style>
