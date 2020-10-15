<template>
  <div class="mt-3">
    <v-card>
      <v-btn router text to="/">Home
      </v-btn>
      <v-icon>mdi-chevron-right</v-icon>
      <v-btn router text to="/store">Store
      </v-btn>
      <v-icon>mdi-chevron-right</v-icon>
      <v-btn router text :to="'/store/'+product.slug">Product Details
      </v-btn>
    </v-card>
    <br>
    <v-card :loading="loading" color="grey darken-4" dark>
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-avatar size="500" tile>
            <v-carousel
              hide-delimiters cycle height="500"
              hide-delimiter-background show-arrows-on-hover>
              <v-carousel-item :src="'https://cwdstore.pythonanywhere.com' + product.featured_image"></v-carousel-item>
              <v-carousel-item :src="'https://cwdstore.pythonanywhere.com' + product.image1"></v-carousel-item>
              <v-carousel-item :src="'https://cwdstore.pythonanywhere.com' + product.image2"></v-carousel-item>
              <v-carousel-item :src="'https://cwdstore.pythonanywhere.com' + product.image3"></v-carousel-item>
            </v-carousel>
          </v-avatar>
        </div>
        <v-card-text class="mt-4 ml-4">
          <h1>{{product.name|capitalize}}</h1><br>
          <p>{{product.category}}</p>
          <h1>$ {{product.price}}</h1>
          <p><br>
            <v-alert v-if="product.in_stock" dense text type="success"><strong>In Stock</strong></v-alert>
            <v-alert v-else dense outlined type="error"><strong>Out Of Stock</strong></v-alert>
          </p>
          <p><br>
          <v-btn v-if="product.in_stock" @click="AddtoCart(product.slug)" color="primary">Add to Bag
            <v-icon right>mdi-cart</v-icon>
          </v-btn>
          <v-btn v-else disabled color="primary">Out of stock
            <v-icon right>mdi-cart</v-icon>
          </v-btn>
          </p>
          <p>{{product.description}}</p>
          <p>FREE Delivery</p>
        </v-card-text>
      </div>
    </v-card>
    <v-card class="mt-10" :loading="loading" color="grey darken-4" dark>
      <v-card-text>
        <v-layout column wrap>
          <v-flex xs12 sm12 md4 lg4 class="pa-4">
            <h2>Product Info</h2>
            <br>
            <h1>Product Description</h1>
            <br>
                <ul>
                  <li>Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies, or trainers) are shoes primarily designed for sports or other forms of physical exercise, but which are now also often used for everyday wear.</li>
                  <li>The term generally describes a type of footwear with a flexible sole made of rubber or synthetic material and an upper part made of leather or synthetic materials. </li>
                </ul>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
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
  data() {
    return {
      show: false,
      loading: false,
      product: {},
      slug: this.$route.params.slug,
    }
  },
  mounted() {
    document.title = `CWD : ${this.slug}`
  },
  created() {
      this.$axios
      .get('https://cwdstore.pythonanywhere.com/store/' + this.$route.params.slug)
      .then((response) => {
        this.product = response.data
      })
      .catch((response)=>{
        console.log(response.message)
        this.$router.push('/store')
        this.$toast.error("Invalid Product URL")
      })
  },
  methods: {
    AddtoCart(slug) {
      this.loading = true
      if (this.$auth.loggedIn) {
        this.$axios
          .post('https://cwdstore.pythonanywhere.com/store/add-to-cart/' + slug + '/', {
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