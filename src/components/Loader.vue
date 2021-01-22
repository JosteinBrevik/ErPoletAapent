<template>
  <div class="loaderContainer">
    <img class="loader" v-bind:src="imageSrc" />
  </div>
</template>

<script>
export default {
  name: "Loader",
  data() {
    return {
      imageSrc: require("@/assets/glass-with-wine_REPLACE.svg")
    };
  }
};
</script>

<style lang="scss" scoped>
.loaderContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.loader {
  animation: grow 0.2s forwards, wiggle 2s 1s infinite;
}

@keyframes grow {
  from {
    height: 10px;
  }
  to {
    height: 50vh;
  }
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-20deg);
  }
  50% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(0deg);
  }
}
</style>
