<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      class="white--text align-end" height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <v-card-title>Product</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>Whitehaven Beach</div>
      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange" text>View</v-btn>
      <v-btn color="orange" text>ADd to cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Products',
  data: () => ({
    show: false,
  }),
}
</script>

<style>
</style>