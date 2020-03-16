<template>
  <div>
    <div class="answer">
      <h1>Er polet åpent?</h1>
      <div class="answerText">
        {{ closestStoreIsOpen ? "Ja" : anotherStoreIsOpen ? "Joa" : "Nei" }}
      </div>
      <p class="subText">
        {{
          closestStoreIsOpen
            ? "Det nærmeste vinmonopolet er åpent, din heldiggris"
            : anotherStoreIsOpen
            ? "Det nærmeste polet er stengt, men andre er åpne. Den nærmeste er denne:"
            : "Men her har du litt info om når det nærmeste polet ditt åpner:"
        }}
      </p>
      <div v-if="closestStoreIsOpen || anotherStoreIsOpen">
        <StoreInfo v-bind:store="allOpenStores[0]" />
      </div>
      <div v-else>
        <StoreInfo v-bind:store="stores[0]" />
      </div>
      <ScrollBar />
    </div>
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
$topPadding: 5vh;
.answer {
  height: calc(100vh - #{$topPadding});
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: $topPadding 0 0;
  max-width: 650px;
  margin: 0 auto;

  @media (max-width: 738px) {
    width: 80%;
  }
}
.answerText {
  color: #eee;
  font-family: "Courier New", Courier, monospace;
  font-size: 8rem;
}
.subText {
  font-size: 1rem;
  line-height: 1.4rem;
}

h1 {
  margin-top: 0;
  letter-spacing: 1px;
}
</style>
