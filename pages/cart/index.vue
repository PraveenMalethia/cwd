<template>
  <div>
    <div>
      <v-layout v-if="cartLoading" row wrap>
        <v-flex xs12 sm12 md12 lg12>
          <v-skeleton-loader
            class="max-auto my-2 pa-2 mb-2 mr-4 ml-4"
            type="card-heading , list-item-three-line">
          </v-skeleton-loader>
        </v-flex>
        <v-flex v-for="n in 8" :key="n" xs12 sm6 md4 lg3 xl2>
          <v-skeleton-loader
            class="pa-1 mb-2 mr-2"
            height="420"
            type="image,card-heading ,list-item-three-line, actions">
          </v-skeleton-loader>
        </v-flex>
      </v-layout>
      <div v-if="products.length > 0">
    <v-card class="mb-3">
    <v-btn router text color="dark" retain-focus-on-click to="/">Home </v-btn>
      <v-icon>mdi-chevron-right</v-icon>
      <v-btn router small text to="/cart">Cart </v-btn>
    </v-card>
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
                <div class="mr-2 subtitle-1">
                  Total Amount : ${{cart.total}}
                </div>
              </v-row>
            </v-card-text>
            <v-divider class="mx-2"></v-divider>
            <v-card-actions>
              <v-btn
                color="deep-purple lighten-1"
                block
                to="/cart/checkout"
                router>Checkout</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-container>
        <v-layout v-if="loading" row wrap>
          <v-flex v-for="n in 8" :key="n" xs12 sm6 md4 lg3 xl2>
            <v-skeleton-loader
              class="pa-1 mx-2"
              height="270"
              type="image , actions"
            >
            </v-skeleton-loader>
          </v-flex>
        </v-layout>
        <v-layout v-else row wrap>
          <v-flex
            v-for="product in filteredProducts"
            :key="product.id" xs12 sm6 md4 lg3>
            <v-card class="max-auto pa-1 mx-1 mb-2" max-width="390">
              <v-carousel
                hide-delimiters
                height="260"
                hide-delimiter-background
                :next-icon="false"
                :prev-icon="false">
                <v-carousel-item :src="'https://cwdstore.pythonanywhere.com/' + product.product.featured_image">
                </v-carousel-item>
              </v-carousel>
              <router-link
                class="router-link"
                :to="'/store/' + product.product.slug">
                <v-card-title>{{
                  product.product.name | capitalize
                }}</v-card-title>
                <v-card-subtitle class="pb-0"
                  >Size - {{ product.product.size }}</v-card-subtitle>
                <v-card-text class="text--primary">
                  <h2>$ {{ product.product.price }}</h2>
                </v-card-text>
              </router-link>
              <v-card-actions>
                <v-btn
                  icon
                  color="yellow"
                  @click="DecreaseQuantity(product.product.slug)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                  <h2>
                    <Roller :isNumberFormat="true" :text="`${product.quantity}`"/>
                  </h2>
                <v-btn
                  icon
                  class="ml-5"
                  color="green"
                  @click="IncreaseQuantity(product.product.slug)">
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
      <v-container v-if="!cartLoading">
        <v-layout row wrap>
          <v-flex class="text-center mt-10">
            <h2>No items in Your Cart <v-icon right>mdi-cart</v-icon></h2><br>
            <v-btn rounded outlined router to="/store">Okay ! Let's Add Some</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    </div>
  </div>
</template>

<script>
import Roller from "vue-roller";
export default {
  components: {Roller},
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  },
  data() {
    return {
      cart: { items: null, total: null },
      query: '',
      products: [],
      loading: true,
      cartLoading: true,
      selection: 1,
    }
  },
  activated() {
    // Call fetch again if last fetch more than .1 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 5000) {
      this.$fetch()
    }
  },
  async fetch() {
    await this.$axios.get('/store/cart').then((response) => {
      this.products = response.data
      this.loading = false
    })
    if (this.$auth.loggedIn) {
        this.$axios
          .get('/store/cart-total-items')
          .then((response) => {
            this.cart.items = response.data
          })
          .catch((error) => {
            if (error.response) {
            // client received an error response (5xx, 4xx)
            } else if (error.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
          })
        this.$axios
          .get('/store/cart-total')
          .then((response) => {
            this.cart.total = response.data
          })
          .catch((error) =>{
            if (error.response) {
            // client received an error response (5xx, 4xx)
            } else if (error.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
          })
        this.cartLoading = false
      } else {
        this.cart.items = 0
        this.cart.total = 0
      }
  },
  methods: {
    getCartTotalItems() {
      if (this.$auth.loggedIn) {
        this.$axios
          .get('/store/cart-total-items')
          .then((response) => {
            this.cart.items = response.data
          })
        this.$axios
          .get('/store/cart-total')
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
        .get('/store/cart')
        .then((response) => (this.products = response.data))
        .catch((error)=>{
          if (error.response) {
            // client received an error response (5xx, 4xx)
            } else if (error.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
        })
    },
    IncreaseQuantity(slug) {
      if (this.$auth.loggedIn) {
        this.$axios
          .post('/store/add-to-cart/' + slug + '/', {
            slug: slug,
          })
          .then((response) => {
            this.getProducts()
            this.getCartTotalItems()
          })
          .catch((error) => {
            if (error.response) {
            // client received an error response (5xx, 4xx)
            } else if (error.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
          })
      } else {
        this.$toast.error('Please login to add products to cart')
      }
    },
    DecreaseQuantity(slug) {
      this.$axios
        .post('/store/remove-cart/' + slug + '/')
        .then((response) => {
          this.$toast.success(response.data.detail)
          this.getProducts()
          this.getCartTotalItems()
        })
        .catch((error) => {
          if (error.response) {
            // client received an error response (5xx, 4xx)
            } else if (error.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
        })
    },
  },
  computed: {
    filteredProducts: function () {
      return this.products.filter((product) => {
        return product.product.name.toLowerCase().match(this.query)
      })
    },
  },
}
</script>
<style>
a {
  text-decoration: none;
  color:white;
}
.v-card__title {
  color: white;
}
</style>