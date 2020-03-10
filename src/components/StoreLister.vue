<template>
  <div class="storeDisplay" id="stores">
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
        v-for="(store, index) in storesToShow"
        :key="index"
        v-bind:store="store"
      />
      <a
        v-if="
          showClosedStores
            ? closestStores.length > numberOfStores
            : closestOpenStores > numberOfStores
        "
        v-on:click="showMoreStores"
      >
        Vis flere
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StoreInfo from "./StoreInfo.vue";
import { IStore } from "../types/customTypes";

export default Vue.extend({
  name: "StoreLister",
  components: {
    StoreInfo
  },
  props: {
    closestStores: Array,
    closestOpenStores: Array
  },
  data() {
    return {
      numberOfStores: 5,
      showClosedStores: false
    };
  },
  computed: {
    storesToShow(): IStore[] {
      const stores = this.showClosedStores
        ? this.$props.closestStores
        : this.$props.closestOpenStores;
      return stores.slice(0, this.numberOfStores);
    }
  },
  methods: {
    setShowClosedStores(should: boolean) {
      this.showClosedStores = should;
    },
    showMoreStores() {
      this.numberOfStores += 5;
    }
  },
  mounted() {
    console.log(
      "numberOfStores",
      this.numberOfStores,
      typeof this.numberOfStores
    );
    this.setShowClosedStores(this.$props.closestOpenStores.length === 0);
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
  margin: 0 auto;

  @media (max-width: 738px) {
    width: 80vw;
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
