<template>
  <img class="marker" v-bind:src="imageSrc" />
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
}
</style>
