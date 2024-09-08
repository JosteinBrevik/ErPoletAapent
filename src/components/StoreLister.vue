<template>
  <div class="storeDisplay" id="stores">
    <div class="column">
      <h2>Nærmeste Vinmonopol:</h2>
      <div class="selectorContainer">
        <div
          v-on:click="setShowClosedStores(true)"
          v-on:keyup.enter="setShowClosedStores(true)"
          v-bind:class="{ selector: true, selected: showClosedStores }"
          tabIndex="0"
        >
          Alle butikker {{ $props.closestStores.length }}
        </div>
        <div
          v-on:click="setShowClosedStores(false)"
          v-on:keyup.enter="setShowClosedStores(false)"
          v-bind:class="{ selector: true, selected: !showClosedStores }"
          tabIndex="0"
        >
          Åpne butikker {{ $props.closestOpenStores.length }}
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
            : closestOpenStores.length > numberOfStores
        "
        v-on:click="showMoreStores"
        v-on:keyup.enter="showMoreStores"
        class="showMoreButton"
        tabIndex="0"
      >
        Vis flere
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import StoreInfo from "./StoreInfo.vue";
import { type IStore } from "../types/customTypes";

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
      return stores.slice(0, Math.min(stores.length, this.numberOfStores));
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
  min-height: 100vh;
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
  padding: 1rem 1rem;
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

.showMoreButton {
  padding: 2rem 0;
  height: 3rem;
  font-size: 1.4rem;
  cursor: pointer;
}

h2 {
  color: #eee;
}

@media (max-width: 768px) {
  .storeDisplay {
    flex-direction: column;
  }
}
</style>
