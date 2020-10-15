<template>
  <v-container>
    <v-layout row wrap>
      <v-flex class="pa-1" xs12 sm12 md6>
        <v-card>
          <v-row>
            <v-col>
              <v-progress-circular
                class="ml-7 mt-5 mb-5 justify-center" :size="200" :value="100" color="green">
                <div v-if="customer.profile_pic">
                  <img
                    height="182"
                    width="182"
                    class="mt-1"
                    :src="'http://cwdstore.pythonanywhere.com'+customer.profile_pic"
                    :alt="$auth.user.username"
                  />
                </div>
                <div v-else>
                  <ProfilePicUpload />
                </div>
              </v-progress-circular>
              <v-divider></v-divider><br>
              <v-row align="center" justify="center">
                <v-btn large outlined icon @click="edit = !edit">
                <v-icon large>mdi-account-edit</v-icon>
                </v-btn>
              </v-row>
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
                  <v-text-field v-model="user.username" prepend-icon="mdi-account-circle" label="Username" :placeholder="this.$auth.user.username"></v-text-field>
                  <v-text-field v-model="user.first_name" prepend-icon="mdi-account" label="First Name" :placeholder="this.$auth.user.first_name"></v-text-field>
                  <v-text-field v-model="user.last_name" prepend-icon="mdi-account" label="Last Name" :placeholder="this.$auth.user.last_name"></v-text-field>
                  <v-text-field v-model="UpdateCustomer.phone_number" prepend-icon="mdi-phone" label="Contact" :placeholder="customer.phone_number"></v-text-field>
                  <v-btn color="deep-purple darken-1" @click="UpdateUser()">Update
                    <v-icon right>mdi-update</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-card-actions>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex class="pa-1" xs12 sm12 md6>
        <v-card>
          <v-toolbar color="deep-purple darken-1" dark flat prominent>
            <v-text-field class="mx-4" flat label="Search by Order ID" v-model="query" solo-inverted>
            </v-text-field>
          </v-toolbar>
          <v-tabs v-model="tab" background-color="deep-purple darken-3" dark>
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
    UpdateCustomer:{
      phone_number:null
    },
    tab: null,
    user: {
      username: null,
      first_name: null,
      last_name: null,
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
    ],
  }),
  methods: {
    loadCustomer(){
      if (this.$auth.loggedIn) {
      this.$axios
        .get('http://cwdstore.pythonanywhere.com/api/auth/customer/')
        .then((response) => {
          this.customer = response.data
        })
      }
    },
    UpdateUser(){
      if (this.user.username == null){
        this.user.username = this.$auth.user.username
      }
      if(this.user.first_name == null){
        this.user.first_name = this.$auth.user.first_name
      }
      if(this.user.last_name == null){
        this.user.last_name = this.$auth.user.last_name
      }
      this.$axios.put('http://cwdstore.pythonanywhere.com/api/auth/user/',this.user)
      .then((response) =>{
        this.$toast.success(`Profile of ${response.data.username} Updated`)
        this.$auth.fetchUser()
        this.edit = false
        this.user.username = null
        this.user.first_name = null
        this.user.last_name = null
      })
      if(this.UpdateCustomer.phone_number != null){
        this.$axios.put('http://cwdstore.pythonanywhere.com/api/auth/customer/',this.UpdateCustomer)
        .then((response) =>{
          this.loadCustomer()
          this.UpdateCustomer.phone_number = null
        })
      }
    }
  },
  mounted: function () {
    document.title = 'CWD : Profile'
    this.loadCustomer()
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