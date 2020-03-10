<template>
  <div
    class="scrollBar"
    v-on:click="scroll"
    @scroll="setUserHasScrolled"
    v-if="!userHasScrolled"
  >
    <p>Se butikker i nærheten</p>
    <div class="arrow">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
export default {
  name: "ScrollBar",
  data() {
    return {
      userHasScrolled: false
    };
  },

  methods: {
    scroll: function() {
      const element = document.getElementById("stores");
      const y = element.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y,
        behavior: "smooth"
      });
    },
    setUserHasScrolled: function() {
      this.userHasScrolled = true;
      window.removeEventListener("scroll", this.handleDebouncedScroll);
    }
  },
  created() {
    this.handleDebouncedScroll = debounce(this.setUserHasScrolled, 100);
    window.addEventListener("scroll", this.handleDebouncedScroll);
  },

  beforeDestroy() {
    // I switched the example from `destroyed` to `beforeDestroy`
    // to exercise your mind a bit. This lifecycle method works too.
    window.removeEventListener("scroll", this.handleDebouncedScroll);
  }
};
</script>

<style scoped>
.scrollBar {
  width: 100%;
  height: 10vh;
  max-height: 10vh;
  padding: 0.5rem 0 1.5rem;

  /* -webkit-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.21);
  -moz-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.21);
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.21); */

  position: absolute;
  bottom: 0;
  opacity: 0%;
  animation: fadein 1s linear 3s forwards;
  /* background-color: #333333; */
}

@keyframes fadein {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

.arrow {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.arrow span {
  display: block;
  width: 10px;
  height: 10px;
  border-bottom: 5px solid #dddddd;
  border-right: 5px solid #dddddd;
  transform: rotate(45deg);
  margin: -3px;
  animation: animate 5s infinite;
}
.arrow span:nth-child(2) {
  animation-delay: -0.2s;
}
.arrow span:nth-child(3) {
  animation-delay: -0.4s;
}

@keyframes animate {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
    transform: rotate(45deg) translate(-10px, -10px);
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(10px, 10px);
  }
}
</style>
