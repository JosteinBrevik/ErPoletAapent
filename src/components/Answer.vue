<template>
  <div v-if="stores.length > 0">
    Hello
    <StoreInfo
      v-for="(store, index) in stores"
      :key="index"
      v-bind:store="store"
    />
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue';
import axios from 'axios';
import StoreInfo from './StoreInfo.vue';

let config = {
  headers: {
    'Ocp-Apim-Subscription-Key': '20c2a4adf74b4864af469d77d04f21f4'
  }
};

export default Vue.extend({
  components: {
    StoreInfo
  },
  data() {
    return {
      msg: 'Hello',
      stores: []
    };
  },
  methods: {
    // need annotation due to `this` in return type
    greet(): string {
      return this.msg + ' world';
    }
  },
  computed: {
    // need annotation
    greeting(): string {
      return this.greet() + '!';
    }
  },
  mounted() {
    console.log('answer mounted');
    axios
      .get('https://apis.vinmonopolet.no/stores/v0/details?', config)
      .then(response => {
        this.stores = response.data;
        console.log(response);
      })
      .catch(error => {
        console.log('ERRRR', error);
      });
  }
});
</script>
