<template>
  <div class="answerText">
    {{ closestStoreIsOpen ? "Ja!" : anotherStoreIsOpen ? "Joa" : "Nei" }}
    <p class="subText">
      {{
        closestStoreIsOpen
          ? "Det nærmeste vinmonopolet er åpent, din heldiggris"
          : anotherStoreIsOpen
          ? "Men det kan hende du må gå litt. Det nærmeste polet er nemlig stengt, men andre er åpne"
          : "Sorry :("
      }}
    </p>
  </div>
</template>

<script>
import { IStore } from "../types/customTypes";
import { storeIsOpen } from "../mixins/locationMixins";

export default {
  props: {
    stores: IStore
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

<style>
.answerText {
  font-size: 12rem;
  font-family: "Courier New", Courier, monospace;
}
.subText {
  font-size: 1.5rem;
}
</style>
