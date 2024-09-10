<template>
  <img class="marker" v-bind:src="imageSrc" alt="map marker" />
</template>

<script lang="ts">
import marker from "@/assets/marker.svg"
export default {
  name: "MapMarker",
  data() {
    return {
      imageSrc: marker
    };
  }
};
</script>

<style lang="scss" scoped>
.marker {
  height: 20px;
  fill: currentColor;
  margin-right: 0.5rem;
}
</style>
