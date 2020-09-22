<template>
  <div>
    <v-card>
      <v-toolbar color="deep-purple darken-1" dark flat>
        <v-text-field v-model="query" class="mx-4" flat hide-details label="Search" solo-inverted></v-text-field>
      </v-toolbar>
    </v-card>
    <v-container>
      <v-layout row wrap>
        <v-flex v-for="product in filteredProducts" :key="product.id" xs12 sm6 md4 lg3>
          <v-card class="max-auto pa-1 mb-2 mr-2" max-width="390">
            <v-carousel
              hide-delimiters
              cycle
              height="260"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item v-for="(slide, i) in slides" :key="i">
                <v-sheet :color="colors[i]" height="100%">
                  <v-row class="fill-height" align="center" justify="center">
                    <div class="display-3">{{ slide }}</div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
            <v-card-title>{{ product.product.name}}</v-card-title>
            <v-card-subtitle class="pb-0">quantity - {{ product.product.size }}</v-card-subtitle>
            <v-card-text class="text--primary">
              <div>Brand - {{product.product.brand}}</div>
              <div>Category - {{product.product.category}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn icon color="yellow" @click="DecreaseQuantity(product.product.slug)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-btn class="ma-2" outlined disabled small fab color="indigo">
                <h2>
                {{product.quantity}}
                </h2>
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
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'blue',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
      query: '',
      products: [],
    }
  },
  methods: {
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
        })
    },
  },
  mounted() {
    this.$axios.get('http://127.0.0.1:8000/store/cart').then(
      (response) => (this.products = response.data)
      //console.log(response.data)
    )
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
</style>