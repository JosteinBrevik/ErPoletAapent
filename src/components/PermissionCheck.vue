<template>
  <fragment>
    <div v-if="currentPermission === Permission.GRANTED">
      <StoreManager :coordinates="coordinates" /> />
    </div>
    <div v-else class="container">
      <div class="storeInfoContainer permissionBox">
        <p class="infoText">
          Siden hvert Vinmonopol har ulike åpningstider, trenger vi å vite hvor
          du er for å gi deg riktig informasjon. Denne dataen blir ikke lagret
          eller sendt til noen andre.
        </p>
        <button v-on:click="askForPermission" class="grantPermissionBtn">
          Den er grei
        </button>
        <p v-if="currentPermission === Permission.DENIED" class="disclaimer">
          Det ser ut til at du har blokkert denne siden fra å finne posisjonen
          din. Du må endre dette i innstillingene til mobilen eller nettleseren
          for å kunne bruke siden.
        </p>
        <p class="disclaimer">
          erpoletåpent.no er IKKE laget av Vinmonopolet, og Vinmonopolet er ikke
          ansvarlige for eventuelle feil eller mangler. For å hente data har vi
          brukt Vinmonopolets offisielle
          <a href="https://api.vinmonopolet.no/" style="color: white">API</a>
        </p>
      </div>
    </div>
  </fragment>
</template>

<script lang="ts">
import { Permission } from "../mixins/locationMixins";
import StoreManager from "./StoreManager.vue";
import { Fragment } from "vue-fragment";

export default {
  name: "PermissionCheck",
  components: {
    Fragment,
    StoreManager
  },
  data() {
    return {
      Permission: Permission,
      currentPermission: Permission.PROMPT,
      coordinates: null,
      timeoutHandle: undefined
    };
  },
  methods: {
    async askForPermission() {
      clearTimeout(this.timeoutHandle);
      try {
        this.coordinates = await this.$getLocation({
          enableHighAccuracy: true
        })
        this.currentPermission = Permission.GRANTED;
      } catch (error) {
        this.currentPermission = Permission.DENIED;
        this.timeoutHandle = setTimeout(() => {
          this.askForPermission();
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss">
.grantPermissionBtn {
  margin: 1.5rem;
  font-size: 1.1rem;
  padding: 1rem;
  border-radius: 12px;
  background-color: black;
  color: #eee;
  border-color: #555;
  border-style: none;
  cursor: pointer;
}

.infoText {
  margin: 1rem 0;
}

.permissionBox {
  margin: auto auto;
  text-align: center;
  color: #ddd;
  border-width: 0;
  font-size: 1.1rem;
  max-width: 40%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
}

.container {
  display: flex;
  height: 100vh;
}

.disclaimer {
  color: #ccc;
  font-size: 0.9rem;
  margin-top: 1rem;
}
</style>
