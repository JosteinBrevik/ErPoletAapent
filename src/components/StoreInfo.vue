<template>
  <div v-on:click="toggleAllInfo">
    <h2>Butikken din</h2>
    <p>{{ store.storeName }}</p>
    <p>Distanse: {{ store.distanceFromUser.toFixed(2) }}</p>
    <p>Adresse: {{ store.address.street }}</p>
    <p>Åpen: {{ currentStoreIsOpen ? "Ja!" : "Nei" }}</p>
    <div v-if="this.showAllInfo">
      <p>Alt: {{ store }}</p>
    </div>
  </div>
</template>

<script>
import { IStore } from "../types/customTypes";
import { storeIsOpen } from "../mixins/locationMixins";
export default {
  props: {
    store: IStore
  },
  data() {
    return {
      showAllInfo: false
    };
  },
  methods: {
    toggleAllInfo: function() {
      this.showAllInfo = !this.showAllInfo;
    }
  },
  computed: {
    currentStoreIsOpen() {
      return storeIsOpen(this.$props.store);
    }
  }
};
</script>

<style></style>
