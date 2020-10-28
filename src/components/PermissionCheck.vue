<template>
  <div v-if="this.hasPermission">Ja</div>
  <div v-else>Nei</div>
</template>

<script>
export default {
  name: "PermissionCheck",
  data() {},
  computed: {
    hasPermission() {
      console.log("hei");
      return navigator.permissions
        .query({ name: "geolocation" })
        .then(function(result) {
          console.log(result);
          return result;
        });
    }
  }
};
</script>

<style></style>
