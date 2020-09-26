<template>
  <div class="mt-3">
    <v-card>
      <v-btn router text color="dark" retain-focus-on-click to="/">Home
      </v-btn>
      <v-icon>mdi-chevron-right</v-icon>
      <v-btn router text to="/store">Store
      </v-btn>
    </v-card>
    <br>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-toolbar class="" color="deep-purple darken-1" dark flat>
            <v-text-field
              v-model="query" class="mx-4" flat hide-details label="Search" solo-inverted
            ></v-text-field>
          </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout v-if="loading" row wrap>
        <v-flex v-for="n in 8" :key="n" xs12 sm6 md4 lg3 xl2>
          <v-skeleton-loader
            class="pa-1 mb-2 mr-2"
            height="420"
            type="image,card-heading ,list-item-three-line, actions"
          >
          </v-skeleton-loader>
        </v-flex>
      </v-layout>
      <v-layout v-else row wrap>
        <v-flex
          v-for="product in filteredProducts"
          :key="product.id" xs12 sm6 md4 lg3 xl2 >
          <v-card class="max-auto pa-1 mb-2 mr-2" max-width="390">
            <v-carousel hide-delimiters cycle height="260" hide-delimiter-background show-arrows-on-hover>
              <v-carousel-item :src="'http://127.0.0.1:8000' + product.featured_image" ></v-carousel-item>
              <v-carousel-item :src="'http://127.0.0.1:8000' + product.image1" ></v-carousel-item>
              <v-carousel-item :src="'http://127.0.0.1:8000' + product.image2" ></v-carousel-item>
              <v-carousel-item :src="'http://127.0.0.1:8000' + product.image3" ></v-carousel-item>
            </v-carousel>
            <router-link class="router-link" :to="'/store/'+product.slug">
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-subtitle class="pb-0"
              >quantity - {{ product.size }}</v-card-subtitle
            >
            <v-card-text class="text--primary">
              <div>Category - {{ product.category }}</div>
            </v-card-text>
            </router-link>
            <v-card-actions>
              <v-btn elevation="0" block @click="AddtoCart(product.slug)" color="deep-purple darken-1" >
                <v-icon left dark>mdi-cart</v-icon>Add to cart
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
      loading: true,
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
      .then((response) => {
        this.products = response.data
        this.loading = false
        })
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