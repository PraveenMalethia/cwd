<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
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
      <v-layout row wrap>
        <v-flex v-for="product in filteredProducts" :key="product.id" xs12 sm6 md4 lg3 xl2>
          <v-hover v-slot:default="{ hover }">
          <v-card class="max-auto pa-1 mb-2 mr-2" max-width="390">
            <v-carousel hide-delimiters delimiter-icon="mdi-minus" :show-arrows="false" cycle height="260" hide-delimiter-background show-arrows-on-hover>
              <v-carousel-item :src="'http://192.168.43.109:8000' + product.featured_image"></v-carousel-item>
              <v-carousel-item :src="'http://192.168.43.109:8000' + product.image1"></v-carousel-item>
              <v-carousel-item :src="'http://192.168.43.109:8000' + product.image2"></v-carousel-item>
              <v-carousel-item :src="'http://192.168.43.109:8000' + product.image3"></v-carousel-item>
              <v-expand-transition>
              <div v-if="hover"
                class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
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
              <v-btn block elevation="0" @click="AddtoCart(product.slug)" color="deep-purple darken-1">
                <v-icon left dark>mdi-plus</v-icon>Add to cart
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
  data: () => ({
    query: '',
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
          .post('http://192.168.43.109:8000/store/add-to-cart/' + slug + '/', {
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
    document.title = 'CWD : Kitchen'
    this.$axios
      .get('http://192.168.43.109:8000/store/kitchen')
      .then((response) => (this.products = response.data))
  },
  computed: {
    filteredProducts: function () {
      return this.products.filter((product) => {
        return product.name.toLowerCase().match(this.query)
      })
    },
  },
  created(){
    document.title = 'CWD : Kitchen'
  },
}
</script>

<style>
</style>