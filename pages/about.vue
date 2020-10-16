<template>
  <v-layout>
    <v-flex class="text-center">
      <blockquote class="blockquote">
        &#8220;NearBy Store Limited, NearBy Store Limited is an Indian e-commerce company based in Punjab, India.
            It was founded by Parveen Malethia in 2020.
            The company initially focused on Grocery sales, after we are expanding into other product categories such as
            consumer electronics, fashion, home essentials , and lifestyle products..&#8221;
        <footer>
          <!-- <small>
            <em>&mdash;Parveen Malethia</em>
          </small> -->
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  auth: false,
  created() {
    document.title = 'NearbyStore : About Us'
  },
  mounted() {
    document.title = 'NearbyStore : About Us'
  }
}
</script>