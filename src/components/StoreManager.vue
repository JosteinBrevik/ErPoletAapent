<template>
  <div v-if="stores && stores.length > 0">
    <Answer v-bind:stores="closestStores" />
    <StoreLister
      v-bind:closestStores="closestStores"
      v-bind:closestOpenStores="closestOpenStores"
    />
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import axios from "axios";
import { getDistance } from "geolib";
import StoreInfo from "./StoreInfo.vue";
import Answer from "./Answer.vue";
import StoreLister from "./StoreLister.vue";
import { IStore } from "../types/customTypes";
import { storeIsOpen } from "../mixins/locationMixins";

let config = {
  headers: {
    "Ocp-Apim-Subscription-Key": "20c2a4adf74b4864af469d77d04f21f4"
  }
};

export default Vue.extend({
  name: "StoreManager",
  components: {
    Answer,
    StoreLister
  },
  props: {
    lat: Number,
    lng: Number
  },
  data() {
    return {
      stores: [] as IStore[] | null
    };
  },
  methods: {
    calculateDistance(store: IStore): number {
      const [storeLat, storeLong] = store.address.gpsCoord
        .split(";")
        .map(num => parseFloat(num));
      const storePos = { latitude: storeLat, longitude: storeLong };
      const currentPos = { latitude: this.lat, longitude: this.lng }; // Lunner: "60.267963", "10.566183" Current: this.lat, this.lng
      const distanceToStore = getDistance(storePos, currentPos);
      return distanceToStore;
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
  mounted() {
    console.log("StoreManager mounted. Props:", this.$props);
    axios
      .get("https://apis.vinmonopolet.no/stores/v0/details?", config)
      .then(response => {
        this.stores = response.data.filter(
          (store: IStore) => store.status === "Open" // Filter out stores that are temporarily or permanently shut down
        );
        console.log(response);
      })
      .catch(error => {
        console.log("ERRRR", error);
      });
  }
});
</script>

<style lang="scss" scoped></style>
