<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list dense nav shaped>
        <div v-if="$auth.loggedIn">
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg" />
            </v-list-item-avatar>
            <v-list-item-content>
              <div v-if="this.$auth.loggedIn">
                <v-list-item-title>{{ $auth.user.username }}</v-list-item-title>
                <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
              </div>
            </v-list-item-content>
          </v-list-item>
        <v-divider></v-divider>
        </div>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <div v-if="item.title == 'Cart'">
              <v-badge 
                :value="hover" color="red accent-4" :content="cart.items" right transition="slide-x-transition">
                <v-hover v-model="hover">
                  <v-icon>mdi-cart</v-icon>
                </v-hover>
              </v-badge>
            </div>
            <div v-else>
              <v-icon>{{ item.icon }}</v-icon>
            </div>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append v-if="$auth.loggedIn">
        <div class="pa-2">
          <v-btn block outlined @click="logout">
            <v-icon left>mdi-exit-to-app</v-icon>Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Logout from '~/components/Logout.vue'
export default {
  components: { Logout},
  data() {
    return {
      loader: null,
      loading4: false,
      clipped: false,
      drawer: true,
      fixed: true,
      hover: true,
      miniVariant: false,
      cart: {
        items: 5,
        total: 250,
      },
      items: [
        {
          icon: 'mdi-home',
          title: 'Welcome',
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
          icon: 'mdi-pin',
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
      miniVariant: false,
      right: true,
      title: 'Churi Wala Dhanna Shop',
      customer: {},
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
}
</script>
