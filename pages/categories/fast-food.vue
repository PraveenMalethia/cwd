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
          <v-toolbar class="" color="deep-purple darken-1" dark flat>
            <v-text-field v-model="query" class="mx-4" flat hide-details label="Search" solo-inverted>
            </v-text-field>
          </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout row wrap>
        <v-flex
          v-for="product in filteredProducts" :key="product.id" xs12 sm6 md4 lg3 xl2>
        <v-hover v-slot:default="{ hover }">
          <v-card class="max-auto pa-1 mb-2 mr-2" max-width="390">
            <v-carousel delimiter-icon="mdi-minus" :show-arrows="false"
              hide-delimiters cycle height="260" hide-delimiter-background>
              <v-carousel-item :src="'https://cwdstore.pythonanywhere.com' + product.featured_image"></v-carousel-item>
              <v-carousel-item :src="'https://cwdstore.pythonanywhere.com' + product.image1"></v-carousel-item>
              <v-carousel-item :src="'https://cwdstore.pythonanywhere.com' + product.image2"></v-carousel-item>
              <v-carousel-item :src="'https://cwdstore.pythonanywhere.com' + product.image3"></v-carousel-item>
              <v-expand-transition>
              <div v-if="hover"
                class="d-flex transition-fast-in-http://cwdstore.pythonanywhere.com v-card--reveal display-3 white--text"
                style="height: 100%;"> ${{product.price}} </div>
              </v-expand-transition>
            </v-carousel>
            <router-link class="router-link" :to="'/store/'+product.slug">
            <v-card-title>{{ product.name|capitalize }}</v-card-title>
            <v-card-subtitle class="pb-0">Size - {{ product.size }}</v-card-subtitle>
            <v-card-text class="text--primary">
              <div>Category - {{ product.category }}</div>
            <p>From - {{ product.brand }}</p>
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
        text: 'Fast food',
        disabled: true,
        href: '/categories/fast-food',
      },
    ],
  }),
  methods: {
    AddtoCart(slug) {
      if (this.$auth.loggedIn) {
        this.$axios
          .post('https://cwdstore.pythonanywhere.com/store/add-to-cart/' + slug + '/', {
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
    document.title = 'CWD : Food & Bevarages'
    this.$axios
      .get('https://cwdstore.pythonanywhere.com/store/fast-food')
      .then((response) => (this.products = response.data))
  },
  computed: {
    filteredProducts: function () {
      return this.products.filter((product) => {
        return product.name.toLowerCase().match(this.query)
      })
    },
  },
  created() {
    document.title = 'CWD : Food & Bevarages'
  }
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