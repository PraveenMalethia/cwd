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
              <v-carousel-item :src="'http://127.0.0.1:8000'+product.featured_image"></v-carousel-item>
              <v-carousel-item :src="'http://127.0.0.1:8000'+product.image1"></v-carousel-item>
              <v-carousel-item :src="'http://127.0.0.1:8000'+product.image2"></v-carousel-item>
              <v-carousel-item :src="'http://127.0.0.1:8000'+product.image3"></v-carousel-item>
            </v-carousel>
            <v-card-title>{{ product.name}}</v-card-title>
            <v-card-subtitle class="pb-0">quantity - {{ product.size }}</v-card-subtitle>
            <v-card-text class="text--primary">
              <div>Brand - {{product.brand}}</div>
              <div>Category - {{product.category}}</div>
            </v-card-text>
            <v-card-actions>
              <nuxt-link :to="'/store/'+product.slug">
                <v-btn color="purple" text outlined>
                  <v-icon left dark>mdi-eye</v-icon>View
                </v-btn>
              </nuxt-link>
              <v-spacer></v-spacer>
              <v-btn @click="AddtoCart(product.slug)" color="deep-purple darken-1">
                <v-icon left dark>mdi-plus</v-icon>Add to cart
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
  auth: false,
  data() {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
      query: '',
      products: [],
    }
  },
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
  mounted() {
    this.$axios
      .get('http://127.0.0.1:8000/store/')
      .then((response) => (this.products = response.data))
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