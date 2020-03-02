<template>
  <div>
    <h2>Butikken din</h2>
    <p>{{ store.storeName }}</p>
  </div>
</template>

<script>
export default {
  props: {
    store: {
      storeID: String,
      storeName: String,
      status: String,
      address: String,
      telephone: String,
      email: String,
      category: String,
      openingHours: String,
      lastChanged: String
    }
  }
};
</script>

<style></style>
