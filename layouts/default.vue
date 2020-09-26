<template>
  <v-app dark>
    <v-navigation-drawer
      color="deep-purple darken-3"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list dense nav shaped>
        <div v-if="$auth.loggedIn">
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-avatar>
              <v-badge
                bordered
                bottom
                overlap
                color="green accent-4"
                dot
                offset-x="10"
                offset-y="10"
              >
                <v-avatar size="40">
                  <v-img
                    v-if="customer.profile_pic"
                    :src="'http://127.0.0.1:8000' + customer.profile_pic"
                  ></v-img>
                  <v-img
                    v-else
                    src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
                  ></v-img>
                </v-avatar>
              </v-badge>
            </v-list-item-avatar>
            <v-list-item-content>
              <div v-if="this.$auth.loggedIn">
                <v-list-item-title
                  >{{ $auth.user.first_name }}
                  {{ $auth.user.last_name }}</v-list-item-title
                >
                <v-list-item-subtitle>{{
                  $auth.user.email
                }}</v-list-item-subtitle>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append v-if="$auth.loggedIn">
        <div class="pa-2">
          <v-btn class="hidden-md-and-up" block outlined @click="logout">
            <v-icon left>mdi-exit-to-app</v-icon>Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-text-field
        solo-inverted
        flat
        v-if="storePage"
        hide-details
        label="Search"
        class="hidden-sm-and-down"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-divider inset vertical></v-divider>
        <v-btn v-if="$auth.loggedIn" @click="logout" text>Logout</v-btn>
        <v-btn v-else text router to="/login">Login</v-btn>
        <v-divider inset vertical></v-divider>
        <v-btn text router to="/cart">Cart</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '~/components/Footer'
export default {
  components: { Footer },
  data() {
    return {
      loader: null,
      loading4: false,
      clipped: false,
      drawer: true,
      fixed: true,
      miniVariant: false,
      customer: {},
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-store',
          title: 'Store',
          to: '/store',
        },
        {
          icon: 'mdi-cart',
          title: 'Cart',
          to: '/cart',
        },
        {
          icon: 'mdi-account-circle',
          title: 'Profile',
          to: '/profile',
        },
        {
          icon: 'mdi-group',
          title: 'Categories',
          to: '/categories',
        },
        {
          icon: 'mdi-crosshairs-gps',
          title: 'Track Order',
          to: '/track-order',
        },
        {
          icon: 'mdi-phone',
          title: 'Contact Us',
          to: '/contact',
        },
        {
          icon: 'mdi-help',
          title: 'About Us',
          to: '/about',
        },
        {
          icon: 'mdi-shield-bug',
          title: 'Feedback',
          to: '/feedback',
        },
      ],
      right: true,
      title: 'Churi Wala Dhanna Shop',
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      await this.$toast.success('Logged Out')
    },
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$axios
        .get('http://0.0.0:8000/api/auth/customer/')
        .then((response) => {
          this.customer = response.data
        })
    }
  },
}
</script>