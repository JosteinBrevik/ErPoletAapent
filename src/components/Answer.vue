<template>
  <div>
    <div class="container">
      <h1>Er polet åpent?</h1>
      <div class="answerText">
        {{ closestStoreIsOpen ? "Ja!" : anotherStoreIsOpen ? "Joa" : "Nei" }}
      </div>
      <p class="subText">
        {{
          closestStoreIsOpen
            ? "Det nærmeste vinmonopolet er åpent, din heldiggris"
            : anotherStoreIsOpen
            ? "Men det kan hende du må gå litt. Det nærmeste polet er nemlig stengt, men andre er åpne"
            : "Sorry :("
        }}
      </p>
      <div v-if="closestStoreIsOpen">
        <StoreInfo v-bind:store="allOpenStores[0]" />
      </div>
    </div>
    <ScrollBar />
  </div>
</template>

<script>
import { IStore } from "../types/customTypes";
import { storeIsOpen } from "../mixins/locationMixins";
import StoreInfo from "./StoreInfo.vue";
import ScrollBar from "./ScrollBar.vue";

export default {
  props: {
    stores: IStore
  },
  components: {
    ScrollBar,
    StoreInfo
  },
  data() {
    return {
      selectedStore: {}
    };
  },
  methods: {},
  computed: {
    closestStoreIsOpen() {
      return storeIsOpen(this.$props.stores[0]);
    },
    allOpenStores() {
      return this.$props.stores.filter(store => storeIsOpen(store));
    },
    anotherStoreIsOpen() {
      return this.allOpenStores.slice().length > 0;
    }
  }
};
</script>

<style lang="scss">
.container {
  height: 75vh;
  font-family: "Courier New", Courier, monospace;
}
.answerText {
  font-size: 12rem;
}
.subText {
  font-size: 1.5rem;
}
</style>
