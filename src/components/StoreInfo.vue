<template>
  <div
    v-on:click="toggleAllInfo"
    class="storeInfoContainer"
    v-bind:class="{ open: currentStoreIsOpen, closed: !currentStoreIsOpen }"
  >
    <h2>
      {{
        store.storeName + ", " + this.prettifyDistance(store.distanceFromUser)
      }}
    </h2>
    <p>{{ store.address.street }}</p>
    <p>Åpen: {{ currentStoreIsOpen ? "Ja!" : "Nei" }}</p>
    <div class="mapsButton" v-on:click.stop="goToMap">
      <a> Åpne i Maps</a>
    </div>
    <div v-if="this.showAllInfo">
      <p>Alt: {{ store }}</p>
    </div>
  </div>
</template>

<script>
import { IStore } from "../types/customTypes";
import { storeIsOpen } from "../mixins/locationMixins";
export default {
  props: {
    store: IStore
  },
  data() {
    return {
      showAllInfo: false
    };
  },
  methods: {
    toggleAllInfo: function() {
      this.showAllInfo = !this.showAllInfo;
    },
    prettifyDistance: function(distance) {
      console.log(distance);
      const lessThanAKm = distance < 1000;
      const lessThan10k = distance < 10000;
      const kilometers = lessThan10k
        ? (distance / 1000).toFixed(1)
        : (distance / 1000).toFixed(0);
      const distanceString = lessThanAKm ? "<1km" : kilometers + "km";
      return distanceString;
    },
    goToMap: function() {
      const { storeName } = this.$props.store;
      const splitName = storeName.includes(",");
      const location = splitName ? storeName.split(",")[1].slice(1) : storeName;
      window.open(
        // "https://www.google.com/maps/place/" +
        //   this.$props.store.address.gpsCoord.split(";").join(",")
        "https://www.google.com/maps/search/Vinmonopolet+" + location
      );
    }
  },
  computed: {
    currentStoreIsOpen() {
      return storeIsOpen(this.$props.store);
    }
  }
};
</script>

<style lang="scss">
.storeInfoContainer {
  padding: 1rem;
  margin: 2rem 1rem;
  border-radius: 16px;
  background: linear-gradient(145deg, #242424, #1f1f1f);
  box-shadow: 5px 5px 19px #171717, -5px -5px 19px #2d2d2d;
  border-style: solid;
  border-width: 1px;

  &.open {
    border-color: #10732a;
  }
  &.closed {
    border-color: #911b13;
  }
}

.mapsButton {
  padding: 1rem 2rem;
  background-color: white;
  color: black;
  cursor: pointer;
  margin: 2rem;
  border-radius: 1rem;
}
</style>
