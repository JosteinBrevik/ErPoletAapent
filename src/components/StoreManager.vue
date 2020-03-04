<template>
  <div v-if="stores && stores.length > 0">
    Hello
    <StoreInfo
      v-for="(store, index) in fiveClosestStores"
      :key="index"
      v-bind:store="store"
    />
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import axios from "axios";
import StoreInfo from "./StoreInfo.vue";
import { IStore } from "../types/customTypes";

let config = {
  headers: {
    "Ocp-Apim-Subscription-Key": "20c2a4adf74b4864af469d77d04f21f4"
  }
};

export default Vue.extend({
  name: "StoreManager",
  components: {
    StoreInfo
  },
  props: {
    lat: Number,
    lng: Number
  },
  data() {
    return {
      msg: "Hello",
      stores: [] as IStore[] | null
    };
  },
  methods: {
    calculateDistance(store: IStore): number {
      const [storeLat, storeLong] = store.address.gpsCoord
        .split(";")
        .map(num => parseFloat(num));
      const longDist = Math.pow(this.lng - storeLong, 2);
      const latDist = Math.pow(this.lat - storeLat, 2);
      return Math.sqrt(longDist + latDist);
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
    fiveClosestStores(): IStore[] {
      if (!this.storesWithDist || this.storesWithDist === []) {
        return [];
      }
      return this.storesWithDist
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
          (store: IStore) => store.status === "Open"
        );
        console.log(response);
      })
      .catch(error => {
        console.log("ERRRR", error);
      });
  }
});
</script>
