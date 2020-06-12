<template>
  <img class="marker" v-bind:src="imageSrc" alt="map marker" />
</template>

<script>
export default {
  name: "MapMarker",
  data() {
    return {
      imageSrc: require("@/assets/marker.svg")
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
