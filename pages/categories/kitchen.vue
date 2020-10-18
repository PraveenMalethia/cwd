<template>
  <div>
    <v-card class="mb-3">
      <v-btn router text color="dark" retain-focus-on-click to="/">Home </v-btn>
      <v-icon>mdi-chevron-right</v-icon>
      <v-btn router small text to="/categories">Categories</v-btn>
      <v-icon>mdi-chevron-right</v-icon>
      <v-btn router small text to="/categories/kitchen">Kitchen</v-btn>
    </v-card>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="deep-purple darken-1" dark flat>
            <v-text-field v-model="query" class="mx-4" flat hide-details label="Search" solo-inverted
            ></v-text-field>
          </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout v-if="loading" row wrap>
        <v-flex v-for="n in 8" :key="n" xs12 sm6 md4 lg3 xl2>
          <v-skeleton-loader class="pa-1 mb-2 mr-2" height="420"
            type="image,card-heading ,list-item-three-line, actions">
          </v-skeleton-loader>
        </v-flex>
      </v-layout>
      <v-layout v-else row wrap>
        <v-flex v-for="product in filteredProducts" :key="product.id" xs12 sm6 md4 lg3 xl2>
          <v-hover v-slot:default="{ hover }">
          <v-card class="max-auto pa-1 mb-2 ml-1 mr-1">
            <v-carousel hide-delimiters delimiter-icon="mdi-minus" :show-arrows="false" cycle height="260" hide-delimiter-background show-arrows-on-hover>
              <v-carousel-item :src="'http://127.0.0.1:8000' + product.featured_image"></v-carousel-item>
              <v-carousel-item :src="'http://127.0.0.1:8000' + product.image1"></v-carousel-item>
              <v-carousel-item :src="'http://127.0.0.1:8000' + product.image2"></v-carousel-item>
              <v-carousel-item :src="'http://127.0.0.1:8000' + product.image3"></v-carousel-item>
              <v-expand-transition>
              <div v-if="hover"
                class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-2 white--text"
                style="height: 100%;">${{product.price}}</div>
              </v-expand-transition>
            </v-carousel>
            <router-link class="router-link" :to="'/store/'+product.slug">
            <v-card-title>{{ product.name|capitalize }}</v-card-title>
            <v-card-subtitle class="pb-0">Size - {{ product.size }}</v-card-subtitle>
            <v-card-text class="text--primary">
              <p>From - {{product.brand}}</p>
            </v-card-text>
            </router-link>
            <v-card-actions>
              <v-btn v-if="product.in_stock" elevation="0" block @click="AddtoCart(product.slug)"
                color="deep-purple darken-1">
                <v-icon left dark>mdi-cart</v-icon>Add to cart
              </v-btn>
              <v-btn v-else elevation="0" disabled block
                color="deep-purple darken-1">
                <v-icon left dark>mdi-cart</v-icon>out of stock
              </v-btn>
            </v-card-actions>
          </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
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
    }
  },
  activated() {
      // Call fetch again if last fetch more than 10 sec ago
      if (this.$fetchState.timestamp <= Date.now() - 20000) {
        this.$fetch()
      }
    },
  async fetch() {
    await this.$axios.get('http://127.0.0.1:8000/store/kitchen')
    .then((response) => {
      this.products = response.data
      this.loading = false
    })
  },
  data: () => ({
    query: '',
    loading:true,
    products: [],
    items: [
      {
        text: 'Home',
        disabled: false,
        href: '/',
      },
      {
        text: 'Categories',
        disabled: false,
        href: '/categories',
      },
      {
        text: 'Kitchen',
        disabled: true,
        href: '/categories/kitchen',
      },
    ],
  }),
  methods: {
    AddtoCart(slug) {
      if (this.$auth.loggedIn) {
        this.$axios
          .post('http://127.0.0.1:8000/store/add-to-cart/' + slug + '/', {
            slug: slug,
          })
          .then((response) => {
            this.$toast.success(response.data.detail)
          })
      } else {
        this.$toast.error('Please login to add products to cart')
      }
    },
  },
  computed: {
    filteredProducts: function () {
      return this.products.filter((product) => {
        return product.name.toLowerCase().match(this.query)
      })
    },
  },
}
</script>

<style>
</style>