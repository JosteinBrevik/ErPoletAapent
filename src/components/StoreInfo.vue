<template>
  <div
    v-on:click="toggleAllInfo"
    class="storeInfoContainer"
    v-bind:class="{ open: currentStoreIsOpen, closed: !currentStoreIsOpen }"
  >
    <div class="text">
      <div>
        <h3>
          {{
            store.storeName +
              ", " +
              this.prettifyDistance(store.distanceFromUser)
          }}
        </h3>
        <p>{{ store.address.street }}</p>
      </div>

      <p v-if="currentStoreIsOpen">Stenger {{ getStoreClosingTime }}</p>
      <p v-else>Stengt</p>

      <!-- <p>Åpen: {{ currentStoreIsOpen ? "Ja!" : "Nei" }}</p> -->
      <div v-if="this.showAllInfo">
        <p>Alt: {{ store }}</p>
      </div>
    </div>

    <div class="mapContainer" v-on:click.stop="goToMap">
      <MapMarker />
      Åpne i kart
    </div>
  </div>
</template>

<script>
import { IStore } from "../types/customTypes";
import { storeIsOpen, closingTimeToday } from "../mixins/locationMixins";
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
    getStoreClosingTime() {
      return closingTimeToday(this.$props.store);
    },
    currentStoreIsOpen() {
      return storeIsOpen(this.$props.store);
    }
  }
};
</script>

<style lang="scss" scoped>
.storeInfoContainer {
  padding: 1rem 1.5rem;
  margin: 3rem 0;
  border-radius: 16px;
  background: linear-gradient(145deg, #242424, #1f1f1f);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  // Neumorphism
  border-radius: 32px;
  background: #222222;
  box-shadow: 17px 17px 23px #151515, -17px -17px 23px #2f2f2f;

  border-style: solid;
  border-width: 2px;

  &.open {
    border-color: #10732a;
  }
  &.closed {
    border-color: #444444; //#911b13;
  }
}

p {
  margin: 5px 0;
}

h3 {
  margin: 5px 0;
}

.text {
  text-align: left;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
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
}
</style>
