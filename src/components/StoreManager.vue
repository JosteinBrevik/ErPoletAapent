<template>
  <div v-if="stores && stores.length > 0">
    <Answer v-bind:stores="closestStores" />
    <div class="storeDisplay">
      <div class="column">
        <h1>Nærmeste Vinmonopol:</h1>
        <div class="selectorContainer">
          <div
            v-on:click="setShowClosedStores(true)"
            v-bind:class="{ selector: true, selected: showClosedStores }"
          >
            Alle butikker
          </div>
          <div
            v-on:click="setShowClosedStores(false)"
            v-bind:class="{ selector: true, selected: !showClosedStores }"
          >
            Åpne butikker
          </div>
          <div
            v-bind:class="{
              selectionBar: true,
              left: showClosedStores,
              right: !showClosedStores
            }"
          />
        </div>
        <StoreInfo
          v-for="(store, index) in showClosedStores
            ? closestStores
            : closestOpenStores"
          :key="index"
          v-bind:store="store"
        />
        <a
          v-if="
            showClosedStores
              ? closestStores.length > storesToShow
              : closestOpenStores.length > storesToShow
          "
          v-on:click="showMoreStores"
        >
          Vis flere
        </a>
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
      storesToShow: 5,
      showClosedStores: false
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
    },
    setShowClosedStores(should: boolean) {
      this.showClosedStores = should;
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
    closestStores(): IStore[] {
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
    closestOpenStores(): IStore[] {
      if (!this.openStores || this.openStores === []) {
        return [];
      }
      const closestStores = this.openStores
        .slice()
        .sort((a, b) => {
          return a.distanceFromUser - b.distanceFromUser;
        })
        .slice(0, this.storesToShow);
      if (closestStores.length === 0) {
        this.setShowClosedStores(true);
      }
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

<style lang="scss" scoped>
.storeDisplay {
  display: flex;
  justify-content: space-around;
}

.column {
  width: 25rem;
  min-height: 500px;

  @media (max-width: 738px) {
    width: 80vw;
    margin: 0 auto;
  }
}

.selectorContainer {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  border-radius: 2rem;
  position: relative;
}

.selector {
  color: #dddddd;
  padding: 1rem 2rem;
  // &.selected {
  //   border-bottom: 4px solid #911b13;
  // }
}

.selectionBar {
  position: absolute;
  width: 50%;
  border: 1px solid white;
  height: 0px;
  bottom: 0;
  transition: left 0.5s;
  transition-timing-function: ease;

  &.left {
    left: 0;
  }

  &.right {
    left: 50%;
  }
}

@media (max-width: 768px) {
  .storeDisplay {
    flex-direction: column;
  }
}
</style>
