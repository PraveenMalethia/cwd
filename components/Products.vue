<template>
  <v-card max-width="300" justify="left">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
    <v-card-title>Product name</v-card-title>
    <v-card-subtitle color="green-text">in stock</v-card-subtitle>
    <v-card-actions>
      <v-btn text>view</v-btn>
      <v-btn color="purple" text>Add to cart</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
      </div>
    </v-expand-transition>
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