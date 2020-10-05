<template>
  <v-container>
    <v-layout row wrap>
      <v-flex class="pa-1" xs12 sm12 md6>
        <v-card>
          <v-row>
            <v-col>
              <v-progress-circular
                class="ml-14 mt-10 mb-10 justify-center"
                :size="200"
                :value="100"
                color="green"
              >
                <div v-if="customer.profile_pic">
                  <img
                    height="180"
                    width="180"
                    :src="'http://127.0.0.1:8000' + customer.profile_pic"
                    alt="John"
                  />
                </div>
                <div v-else>
                  <ProfilePicUpload />
                </div>
              </v-progress-circular>
            </v-col>
            <v-col>
              <div v-if="!edit">
                <h3 class="ml-5 mt-2">Your Profile</h3>
                <div class="grey--text text-darken-1 mt-10 ml-5">
                  <h2>Username : {{ $auth.user.username }}</h2>
                  <h4 class="mt-5">
                    Name : {{ $auth.user.first_name }}
                    {{ $auth.user.last_name }}
                  </h4>
                  <h4 class="mt-5">Email : {{ $auth.user.email }}</h4>
                  <h4 class="mt-5">Contact : {{ customer.phone_number }}</h4>
                </div>
              </div>
              <div v-else>
                <h3 class="ml-5 mt-2">Edit Profile</h3>
                <div class="grey--text text-darken-1 mt-10 ml-5 mr-3">
                  <v-text-field
                    label="Username"
                    :value="this.$auth.user.username"
                  ></v-text-field>
                  <h4 class="mt-5">
                    Name : {{ $auth.user.first_name }}
                    {{ $auth.user.last_name }}
                  </h4>
                  <h4 class="mt-5">Email : {{ $auth.user.email }}</h4>
                  <h4 class="mt-5">Contact : {{ customer.phone_number }}</h4>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn icon @click="edit = !edit">
              <v-icon right>mdi-account-edit</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex class="pa-1" xs12 sm12 md6>
        <v-card>
          <v-toolbar color="purple" dark flat prominent>
            <v-text-field
              class="mx-4"
              flat
              label="Search by Order ID"
              v-model="query"
              solo-inverted
            >
            </v-text-field>
          </v-toolbar>
          <v-tabs v-model="tab" background-color="primary" dark>
            <v-tab v-for="order in filteredOrders" :key="order.order_id">
              Order Id: {{ order.order_id }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="order in filteredOrders" :key="order.order_id">
              <v-card flat>
                <v-card-text>{{ order.content }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProfilePicUpload from '~/components/ProfilePicUpload'

export default {
  data: () => ({
    dialog: false,
    customer: {},
    tab: null,
    user: {
      username: '',
      first_name: '',
      last_name: '',
    },
    query: '',
    edit: false,
    orders: [
      { order_id: '1', content: 'Order number 1 Content' },
      { order_id: '2', content: 'Order number 2 Content' },
      { order_id: '3', content: 'Order number 3 Content' },
      { order_id: '4', content: 'Order number 4 Content' },
      { order_id: '5', content: 'Order number 4 Content' },
      { order_id: '6', content: 'Order number 4 Content' },
      { order_id: '7', content: 'Order number 4 Content' },
      { order_id: '8', content: 'Order number 4 Content' },
      { order_id: '9', content: 'Order number 4 Content' },
      { order_id: '10', content: 'Order number 4 Content' },
    ],
  }),
  mounted: function () {
    document.title = 'CWD : Profile'
    if (this.$auth.loggedIn) {
      this.$axios
        .get('http://127.0.0.1:8000/api/auth/customer/')
        .then((response) => {
          this.customer = response.data
        })
    }
  },
  computed: {
    filteredOrders: function () {
      return this.orders.filter((order) => {
        return order.order_id.toLowerCase().match(this.query)
      })
    },
  },
  created() {
    document.title = 'CWD : Profile'
  },
}
</script>

<style scoped>
img {
  border-radius: 50%;
}
</style>