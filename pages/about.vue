<template>
<div>
  <v-card>
      <v-btn router text color="dark" retain-focus-on-click to="/">Home </v-btn>
      <v-icon>mdi-chevron-right</v-icon>
      <v-btn router small text to="/about">About </v-btn>
    </v-card>
  <v-layout>
    <v-flex class="text-center">
      <blockquote class="blockquote font-weight-bold">
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
</div>
</template>
<script>
export default {
  auth: false,
}
</script>