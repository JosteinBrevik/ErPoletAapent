<template>
  <div
    v-on:click="toggleAllInfo"
    v-on:keyup.enter="toggleAllInfo"
    class="storeInfoContainer"
    v-bind:class="{ open: currentStoreIsOpen, closed: !currentStoreIsOpen }"
  >
    <h3>
      {{
        this.storeDisplayName +
          " - " +
          this.prettifyDistance(store.distanceFromUser)
      }}
    </h3>
    <div class="text">
      <div>
        <p>{{ store.address.street }}</p>
      </div>

      <div v-if="currentStoreIsOpen" class="rightColText">
        <p>Stenger {{ getStoreClosingTime }}</p>
      </div>
      <div v-else class="rightColText">
        <p>Åpner {{ getNextOpeningTime }}</p>
      </div>
    </div>

    <div
      class="mapContainer"
      v-on:click.stop="goToMap"
      v-on:keyup.enter="goToMap"
      tabIndex="0"
    >
      <MapMarker />
      Åpne i kart
    </div>

    <div v-if="this.showAllInfoInTest">
      <p>Alt: {{ store }}</p>
    </div>
  </div>
</template>

<script>
import { IStore } from "../types/customTypes";
import {
  storeIsOpen,
  closingTimeToday,
  nextOpeningTime,
  filterStoreName
} from "../mixins/locationMixins";
import MapMarker from "../assets/MapMarker.vue";

export default {
  props: {
    store: IStore
  },
  data() {
    return {
      showAllInfo: false
    };
  },
  components: {
    MapMarker
  },
  methods: {
    toggleAllInfo: function() {
      this.showAllInfo = !this.showAllInfo;
    },
    prettifyDistance: function(distance) {
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
      const location = filterStoreName(storeName);
      window.open(
        "https://www.google.com/maps/search/Vinmonopolet+" + location
      );
    }
  },
  computed: {
    getStoreClosingTime() {
      return closingTimeToday(this.$props.store);
    },
    currentStoreIsOpen() {
      return storeIsOpen(this.$props.store);
    },
    getNextOpeningTime() {
      return nextOpeningTime(this.$props.store);
    },
    storeDisplayName() {
      const store = this.$props.store;
      return filterStoreName(store.storeName);
    },
    showAllInfoInTest() {
      return this.showAllInfo && window.location.href.includes("localhost");
    }
  }
};
</script>

<style lang="scss" scoped>
.storeInfoContainer {
  padding: 1.5rem 1.5rem;
  margin: 3rem auto;
  border-radius: 16px;
  max-width: 400px;
  background: linear-gradient(145deg, #242424, #1f1f1f);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //align-items: center;
  text-align: left;

  // Neumorphism
  border-radius: 32px;
  background: #222222;
  box-shadow: 9px 9px 36px #141414, -9px -9px 36px #303030;

  border-style: solid;
  border-width: 2px;

  &.open {
    border-color: rgba(0, 148, 25, 0.5);
  }
  &.closed {
    border-color: rgba(68, 68, 68, 0.5); //#911b13;
  }
}

p {
  margin: 5px 0;
}

h3 {
  margin: 5px 0;
  letter-spacing: 1px;
  color: #eee;
}

.text {
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  color: #aaa;
}

.rightColText {
  text-align: right;
  font-weight: 500;
  margin-left: 0.7rem;
}

.mapContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  border-radius: 10px;
  background: #ddd;
  box-shadow: 0px 0px 5px rgba(200, 200, 200, 0.1);
  margin-top: 1rem;
  padding: 0.5rem 0;
  color: #222;
  font-weight: 600;

  &:hover {
    box-shadow: 0px 0px 7px rgba(200, 200, 200, 0.5);
  }
}
</style>
