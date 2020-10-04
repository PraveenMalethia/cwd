<template>
  <div>
    <v-card>
      <v-toolbar color="deep-purple darken-1" dark flat>
        <v-text-field v-model="query" class="mx-4" flat hide-details label="Search" solo-inverted>
        </v-text-field>
      </v-toolbar>
    </v-card>
    <div v-if="products.length">
      <v-layout v-if="cartLoading" row wrap>
        <v-flex xs12 sm12 md12 lg12>
          <v-skeleton-loader
            class="max-auto my-2 pa-2 mb-2 mr-4 ml-4"
            type="card-heading , list-item-three-line">
          </v-skeleton-loader>
        </v-flex>
      </v-layout>
      <v-layout v-else row wrap>
        <v-flex xs12 sm12 md12 lg12>
          <v-card class="mx-auto my-2 pa-2 mb-2 mr-4 ml-4">
            <v-card-title>Cart Details</v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0">
                <div class="my-2 subtitle-1">
                  Total Items : {{ cart.items }}
                </div>
                <v-spacer></v-spacer>
                <div class="my-2 subtitle-1">
                  Total Amount : ${{ cart.total }}
                </div>
              </v-row>
            </v-card-text>
            <v-divider class="mx-2"></v-divider>
            <v-card-actions>
              <v-btn color="deep-purple lighten-1" block to="/cart/checkout" router>Checkout</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-container>
        <v-layout v-if="loading" row wrap>
          <v-flex v-for="n in 8" :key="n" xs12 sm6 md4 lg3 xl2>
            <v-skeleton-loader class="pa-1 mx-2" height="270" type="image , actions">
            </v-skeleton-loader>
          </v-flex>
        </v-layout>
        <v-layout v-else row wrap>
          <v-flex v-for="product in filteredProducts" :key="product.id" xs12 sm6 md4 lg3>
            <v-card small class="max-auto pa-1 mx-1" max-width="390">
              <v-carousel hide-delimiters height="260" hide-delimiter-background :next-icon="false" :prev-icon="false">
                <v-carousel-item :src="
                    'http://127.0.0.1:8000' + product.product.featured_image">
                </v-carousel-item>
              </v-carousel>
              <v-card-title>{{ product.product.name }}</v-card-title>
              <v-card-subtitle class="pb-0">Size - {{ product.product.size }}</v-card-subtitle>
              <v-card-text class="text--primary">
                <div>Brand - {{ product.product.brand }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn icon color="yellow" @click="DecreaseQuantity(product.product.slug)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-btn class="ma-2" outlined disabled small fab color="indigo">
                  <h2>{{ product.quantity }}</h2>
                </v-btn>
                <v-btn icon color="green" @click="IncreaseQuantity(product.product.slug)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon color="red">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div v-else>
      <v-container>
        <v-layout row wrap>
          <h2>No items in your cart</h2>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: {
        items: null,
        total: null,
      },
      query: '',
      products: [],
      loading: true,
      cartLoading: true,
      selection: 1,
    }
  },
  methods: {
    getCartTotalItems() {
      if (this.$auth.loggedIn) {
        this.$axios
          .get('http://127.0.0.1:8000/store/cart-total-items')
          .then((response) => {
            this.cart.items = response.data
          })
        this.$axios
          .get('http://127.0.0.1:8000/store/cart-total')
          .then((response) => {
            this.cart.total = response.data
          })
        this.cartLoading = false
      } else {
        this.cart.items = 0
        this.cart.total = 0
      }
    },
    getProducts() {
      this.$axios
        .get('http://127.0.0.1:8000/store/cart')
        .then((response) => (this.products = response.data))
    },
    IncreaseQuantity(slug) {
      if (this.$auth.loggedIn) {
        this.$axios
          .post('http://127.0.0.1:8000/store/add-to-cart/' + slug + '/', {
            slug: slug,
          })
          .then((response) => {
            this.getProducts()
            this.getCartTotalItems()
          })
      } else {
        this.$toast.error('Please login to add products to cart')
      }
    },
    DecreaseQuantity(slug) {
      this.$axios
        .post('http://127.0.0.1:8000/store/remove-cart/' + slug + '/')
        .then((response) => {
          this.$toast.success(response.data.detail)
          this.getProducts()
          this.getCartTotalItems()
        })
    },
  },
  mounted() {
    document.title = 'CWD : Cart'
    this.$axios.get('http://127.0.0.1:8000/store/cart').then((response) => {
      this.products = response.data
      this.loading = false
    })
    this.getCartTotalItems()
  },
  computed: {
    filteredProducts: function () {
      return this.products.filter((product) => {
        return product.product.name.toLowerCase().match(this.query)
      })
    },
  },
  created() {
    document.title = 'CWD : Cart'
  }
}
</script>