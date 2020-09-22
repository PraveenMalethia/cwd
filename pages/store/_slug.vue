<template>
  <div>
    <v-card :loading="loading" class="mx-auto" max-width="374">
      <v-carousel
              hide-delimiters
              cycle
              height="260"
              hide-delimiter-background
              show-arrows-on-hover>
              <v-carousel-item
                :src="'http://127.0.0.1:8000'+product.featured_image"></v-carousel-item>
            <v-carousel-item
                :src="'http://127.0.0.1:8000'+product.image1"></v-carousel-item>
            <v-carousel-item
                :src="'http://127.0.0.1:8000'+product.image2"></v-carousel-item>
            <v-carousel-item
                :src="'http://127.0.0.1:8000'+product.image3"></v-carousel-item>
            </v-carousel>
      <v-card-title> {{ product.name }}</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
          <div class="grey--text ml-4">4.5 (413)</div>
        </v-row>
        <div class="my-4 subtitle-1">${{ product.price }}</div>
        <div>{{ product.description }}</div>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <!-- <v-card-title>Tonight's availability</v-card-title>
      <v-card-text>
        <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
          <v-chip>5:30PM</v-chip>
          <v-chip>7:30PM</v-chip>
          <v-chip>8:00PM</v-chip>
          <v-chip>9:00PM</v-chip>
        </v-chip-group>
      </v-card-text> -->
      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text @click="AddtoCart(product.slug)">Add to cart</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      loading: false,
      selection: 1,
      product: {},
      slug: this.$route.params.slug,
    }
  },
  created: function () {
    this.$axios
      .get('http://127.0.0.1:8000/store/' + this.$route.params.slug)
      .then((response) => {
        this.product = response.data
      })
  },
  methods: {
      AddtoCart (slug) {
        this.loading = true
        if (this.$auth.loggedIn) {
        this.$axios
          .post('http://127.0.0.1:8000/store/add-to-cart/' + slug + '/', {
            slug: slug,
          })
          .then((response) => {
            this.$toast.success(response.data.detail)
          })
          setTimeout(() => (this.loading = false), 1000)
      } else {
        this.$toast.error('Please login to add products to cart')
      }
      },
    },
}
</script>

<style>
</style>