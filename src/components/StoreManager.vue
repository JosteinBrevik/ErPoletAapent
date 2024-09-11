<template>
  <div>
    <Answer v-bind:stores="closestStores" />
    <StoreLister
      v-bind:closestStores="closestStores"
      v-bind:closestOpenStores="closestOpenStores"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getDistance } from "geolib";
import Answer from "./Answer.vue";
import StoreLister from "./StoreLister.vue";
import Loader from "./Loader.vue";
import { type IStore } from "../types/customTypes";
import { storeIsOpen } from "../mixins/locationMixins";

export default Vue.extend({
  name: "StoreManager",
  props: ["coordinates", "stores"],
  components: {
    Answer,
    StoreLister,
    Loader
  },
  data() {
    return {
      coords: {
        lat: "",
        lng: ""
      },
    };
  },
  methods: {
    calculateDistance(store: IStore): number {
      const [storeLat, storeLong] = store.address.gpsCoord
        .split(";")
        .map(num => parseFloat(num));
      const storePos = { latitude: storeLat, longitude: storeLong };
      const currentPos = {
        latitude: this.$props.coordinates.lat,
        longitude: this.$props.coordinates.lng
      }; // Lunner: { latitude: "60.267963", longitude: "10.566183" } Current: { latitude: this.coords.lat, longitude: this.coords.long }
      const distanceToStore = getDistance(storePos, currentPos);
      return distanceToStore;
    },

  },
  computed: {
    storesWithDist(): IStore[] {
      return this.$props.stores.map(store => {
        return { ...store, distanceFromUser: this.calculateDistance(store) };
      });
    },
    openStores(): IStore[] {
      return this.storesWithDist.slice().filter(store => storeIsOpen(store));
    },
    closestStores(): IStore[] {
      if (!this.storesWithDist || this.storesWithDist === []) {
        return [];
      }
      return this.storesWithDist.slice().sort((a, b) => {
        return a.distanceFromUser - b.distanceFromUser;
      });
    },
    closestOpenStores(): IStore[] {
      if (!this.openStores || this.openStores === []) {
        return [];
      }
      const closestStores = this.openStores.slice().sort((a, b) => {
        return a.distanceFromUser - b.distanceFromUser;
      });
      return closestStores;
    }
  },
});
</script>

<style lang="scss" scoped></style>
