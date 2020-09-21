<template>
  <v-card>
    <v-toolbar color="purple" dark flat >
      <v-text-field
      v-model="query"
        class="mx-4"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
    name: 'SearchBar',
    data () {
      return {
        query:''
      }
    },
}
</script>

<style>
</style>