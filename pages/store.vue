<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="n in 8" :key="n" xl3 sm12 lg3>
          <Products />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Products from '~/components/Products.vue'
export default {
  components: { Products },
  auth: false
}
</script>

<style>
</style>