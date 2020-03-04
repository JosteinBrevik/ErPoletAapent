<template>
  <div v-if="stores && stores.length > 0">
    <Answer v-bind:stores="fiveClosestStores" />
    <div class="storeDisplay">
      <div class="column">
        <h1>Closest stores:</h1>
        <StoreInfo
          v-for="(store, index) in fiveClosestStores"
          :key="index"
          v-bind:store="store"
        />
        <a v-on:click="showMoreStores"> Vis flere </a>
      </div>
      <div class="column">
        <h1>Closest open stores:</h1>
        <StoreInfo
          v-for="(store, index) in fiveClosestOpenStores"
          :key="index"
          v-bind:store="store"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import axios from "axios";
import { getDistance } from "geolib";
import StoreInfo from "./StoreInfo.vue";
import Answer from "./Answer.vue";
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
    StoreInfo,
    Answer
  },
  props: {
    lat: Number,
    lng: Number
  },
  data() {
    return {
      msg: "Hello",
      stores: [] as IStore[] | null,
      storesToShow: 5
    };
  },
  methods: {
    calculateDistance(store: IStore): number {
      const [storeLat, storeLong] = store.address.gpsCoord
        .split(";")
        .map(num => parseFloat(num));
      const storePos = { latitude: storeLat, longitude: storeLong };
      const currentPos = { latitude: "60.267963", longitude: "10.566183" }; // Lunner: "60.267963", "10.566183" Current: this.lat, this.lng
      const distanceToStore = getDistance(storePos, currentPos);
      return distanceToStore;
    },
    showMoreStores() {
      this.storesToShow += 5;
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
    fiveClosestStores(): IStore[] {
      if (!this.storesWithDist || this.storesWithDist === []) {
        return [];
      }
      return this.storesWithDist
        .slice()
        .sort((a, b) => {
          return a.distanceFromUser - b.distanceFromUser;
        })
        .slice(0, this.storesToShow);
    },
    fiveClosestOpenStores(): IStore[] {
      if (!this.openStores || this.openStores === []) {
        return [];
      }
      return this.openStores
        .slice()
        .sort((a, b) => {
          return a.distanceFromUser - b.distanceFromUser;
        })
        .slice(0, 5);
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

<style scoped>
.storeDisplay {
  display: flex;
  justify-content: space-around;
}

@media (max-width: 768px) {
  .storeDisplay {
    flex-direction: column;
  }
}
</style>
