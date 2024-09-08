<template>
  <div v-if="!loadingStores && !loadingCoords">
    <Answer v-bind:stores="closestStores" />
    <StoreLister
      v-bind:closestStores="closestStores"
      v-bind:closestOpenStores="closestOpenStores"
    />
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import axios from "axios";
import { getDistance } from "geolib";
import StoreInfo from "./StoreInfo.vue";
import Answer from "./Answer.vue";
import StoreLister from "./StoreLister.vue";
import Loader from "./Loader.vue";
import PermissionCheck from "./PermissionCheck.vue";
import { type IStore } from "../types/customTypes";
import { storeIsOpen } from "../mixins/locationMixins";

export default Vue.extend({
  name: "StoreManager",
  components: {
    Answer,
    StoreLister,
    Loader
  },
  data() {
    return {
      stores: [] as IStore[] | null,
      loadingCoords: true,
      loadingStores: true,
      coords: {
        lat: "",
        lng: ""
      },
      location: null as any
    };
  },
  methods: {
    calculateDistance(store: IStore): number {
      const [storeLat, storeLong] = store.address.gpsCoord
        .split(";")
        .map(num => parseFloat(num));
      const storePos = { latitude: storeLat, longitude: storeLong };
      const currentPos = {
        latitude: this.coords.lat,
        longitude: this.coords.lng
      }; // Lunner: { latitude: "60.267963", longitude: "10.566183" } Current: { latitude: this.coords.lat, longitude: this.coords.long }
      const distanceToStore = getDistance(storePos, currentPos);
      return distanceToStore;
    },
    async getCurrentLocation() {
      // console.log("trying to fetch loc");
      try {
        const coordinates = await (this as any).$getLocation({
          enableHighAccuracy: true
        });
        this.coords = coordinates;
        // console.log("Fetched coords:", coordinates);
        this.loadingCoords = false;
      } catch (error) {
        // console.log("failed", error);
      }
    },
    async fetchStores() {
      //console.log("fetching stores");
      const isInTest = window.location.href.includes("localhost");
      const storesUrl =
        (isInTest ? "https://www.erpoletåpent.no" : "") + "/api/stores";
      axios
        .get(storesUrl)
        .then(response => {
          this.stores = response.data
            .filter(
              (store: IStore) => store.status === "Open" // Filter out stores that are temporarily or permanently shut down
            )
            .slice(10);
          //console.log("Fetched stores", response);
          this.loadingStores = false;
        })
        .catch(error => {
          //console.log("ERRRR", error);
        });
    }
  },
  computed: {
    storesWithDist(): IStore[] {
      if (this.stores === null) {
        return [];
      }
      return this.stores.map(store => {
        return { ...store, distanceFromUser: this.calculateDistance(store) };
      });
    },
    openStores(): IStore[] {
      if (!this.stores) {
        return [];
      }
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
  beforeMount() {
    this.getCurrentLocation();
    this.fetchStores();
  },
  mounted() {
    //console.log("StoreManager mounted. Props:", this.$props);
  }
});
</script>

<style lang="scss" scoped></style>
