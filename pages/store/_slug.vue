<template>
  <div class="mb-3">
    <v-card>
      <v-btn router text to="/">Home </v-btn>
      <v-icon>mdi-chevron-right</v-icon>
      <v-btn router small text to="/store">Store </v-btn>
      <v-icon>mdi-chevron-right</v-icon>
      <v-btn router small text :to="'/store/' + product.slug">Product </v-btn>
    </v-card>
    <div v-if="!loaded">
      <br />
      <v-skeleton-loader class="mx-auto" max-width="1000" type="card,list-item-three-line,actions"></v-skeleton-loader>
      <br />
      <v-skeleton-loader type="article, list-item-three-line"></v-skeleton-loader>
    </div>
    <div v-else>
      <br />
      <div class="hidden-md-and-up">
        <v-carousel hide-delimiters cycle height="400px" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item :src="'http://127.0.0.1:8000' + product.featured_image"></v-carousel-item>
          <v-carousel-item :src="'http://127.0.0.1:8000' + product.image1"></v-carousel-item>
          <v-carousel-item :src="'http://127.0.0.1:8000' + product.image2"></v-carousel-item>
          <v-carousel-item :src="'http://127.0.0.1:8000' + product.image3"></v-carousel-item>
        </v-carousel>
        <v-card>
          <v-card-text class="mt-4 ml-1">
            <h1>{{ product.name | capitalize }}</h1>
            <br />
            <p>{{ product.category }}</p>
            <h1>$ {{ product.price }}</h1>
            <p>
              <br />
              <v-alert v-if="product.in_stock" dense text type="success"><strong>In Stock</strong></v-alert>
              <v-alert v-else dense outlined type="error"><strong>Out Of Stock</strong></v-alert>
            </p>
            <p>
              <br />
              <v-btn
                v-if="product.in_stock"
                @click="AddtoCart(product.slug)"
                color="primary"
                >Add to Bag
                <v-icon right>mdi-cart</v-icon>
              </v-btn>
              <v-btn v-else disabled color="primary"
                >Out of stock
                <v-icon right>mdi-cart</v-icon>
              </v-btn>
            </p>
            <p>FREE Delivery</p>
          </v-card-text>
        </v-card>
      </div>
      <v-card :loading="loading" color="grey darken-4" class="hidden-sm-and-down" dark>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-carousel hide-delimiters cycle height="400px" hide-delimiter-background show-arrows-on-hover>
              <v-carousel-item width="400px" :src="'http://127.0.0.1:8000' + product.featured_image"></v-carousel-item>
              <v-carousel-item width="400px" :src="'http://127.0.0.1:8000' + product.image1"></v-carousel-item>
              <v-carousel-item width="400px" :src="'http://127.0.0.1:8000' + product.image2"></v-carousel-item>
              <v-carousel-item width="400px" :src="'http://127.0.0.1:8000' + product.image3"></v-carousel-item>
            </v-carousel>
          </div>
          <v-card-text class="mt-4 ml-4">
            <h1>{{ product.name | capitalize }}</h1>
            <br />
            <p>{{ product.category }}</p>
            <h1>$ {{ product.price }}</h1>
            <p>
              <br />
              <v-alert v-if="product.in_stock" dense text type="success"
                ><strong>In Stock</strong></v-alert>
              <v-alert v-else dense outlined type="error"
                ><strong>Out Of Stock</strong></v-alert>
            </p>
            <p>
              <br />
              <v-btn
                v-if="product.in_stock"
                @click="AddtoCart(product.slug)"
                color="primary"
                >Add to Bag
                <v-icon right>mdi-cart</v-icon>
              </v-btn>
              <v-btn v-else disabled color="primary"
                >Out of stock
                <v-icon right>mdi-cart</v-icon>
              </v-btn>
            </p>
            <p>FREE Delivery</p>
          </v-card-text>
        </div>
      </v-card>
      <v-card class="mt-10" :loading="loading" color="grey darken-4" dark>
        <v-card-text>
          <v-layout column wrap>
            <v-flex xs12 sm12 md4 lg4 class="pa-4">
              <h2>Product Info</h2>
              <br />
              <h1>Product Description</h1>
              <br />
              <ul>
                <li>{{ product.description }}</li>
              </ul>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  },
  data() {
    return {
      show: false,
      loaded: false,
      loading: false,
      product: {},
      slug: this.$route.params.slug,
    }
  },
  activated() {
    // Call fetch again if last fetch more than 10 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 10000) {
      this.$fetch()
    }
  },
  async fetch() {
    this.$axios
      .get('/store/' + this.$route.params.slug)
      .then((response) => {
        this.product = response.data
        this.loaded = true
      })
      .catch((response) => {
        console.log(response.message)
        this.$router.push('/store')
        this.$toast.error('Invalid Product URL')
      })
  },
  methods: {
    AddtoCart(slug) {
      this.loading = true
      if (this.$auth.loggedIn) {
        this.$axios
          .post('/store/add-to-cart/' + slug + '/', {
            slug: slug,
          })
          .then((response) => {
            this.$toast.success(response.data.detail)
          })
        setTimeout(() => (this.loading = false), 1000)
      } else {
        this.$toast.error('Please login to add products to cart')
        setTimeout(() => (this.loading = false), 1000)
      }
    },
  },
}
</script>

<style>
</style>