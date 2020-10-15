<template>
  <v-container>
    <v-layout row wrap>
      <v-flex class="pa-1" xs12 sm12 md6>
        <v-card class="mx-auto" dark max-width="450">
          <v-card-title>
            <v-icon large left> mdi-account </v-icon>
            <span class="title font-weight-light">Account</span>
            <v-spacer></v-spacer>
            <v-btn text @click="edit = !edit">Edit
                  <v-icon right>mdi-account-edit</v-icon>
                </v-btn>
          </v-card-title>
          <v-card-text class="headline">
            <div v-if="!edit">
              <div class="mt-2 ml-5">
                <h5><v-icon left>mdi-account-circle</v-icon>Username : {{ $auth.user.username }}</h5>
                <h5 class="mt-5"><v-icon left>mdi-account-box</v-icon>Name : {{ $auth.user.first_name }}{{ $auth.user.last_name }}</h5>
                <h5 class="mt-5"><v-icon left>mdi-gmail</v-icon>Email : {{ $auth.user.email }}</h5>
                <h5 class="mt-5"><v-icon left>mdi-phone</v-icon>Contact : {{ customer.phone_number }}</h5>
              </div>
            </div>
            <div v-else>
              <h3 class="ml-5 mt-2">Edit Profile</h3>
              <div class="grey--text text-darken-1 mt-10 ml-5 mr-3">
                <v-text-field
                  v-model="user.username"
                  prepend-icon="mdi-account-circle"
                  label="Username"
                  :placeholder="this.$auth.user.username"
                ></v-text-field>
                <v-text-field
                  v-model="user.first_name"
                  prepend-icon="mdi-account"
                  label="First Name"
                  :placeholder="this.$auth.user.first_name"
                ></v-text-field>
                <v-text-field
                  v-model="user.last_name"
                  prepend-icon="mdi-account"
                  label="Last Name"
                  :placeholder="this.$auth.user.last_name"
                ></v-text-field>
                <v-text-field
                  v-model="UpdateCustomer.phone_number"
                  prepend-icon="mdi-phone"
                  label="Contact"
                  :placeholder="customer.phone_number"
                ></v-text-field>
                <v-btn color="deep-purple darken-1" @click="UpdateUser()"
                  >Update
                  <v-icon right>mdi-update</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-content>
                <v-spacer></v-spacer>
                <v-list-item-title v-if="customer.profile_pic">Change Profile Pic</v-list-item-title>
                <v-list-item-title v-else>Upload Profile Pic</v-list-item-title>
              </v-list-item-content>
              <v-row align="center" justify="end">
                <ProfilePicUpload />
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex class="pa-1" xs12 sm12 md6>
        <v-card class="mx-auto" max-width="500">
          <v-toolbar color="green darken-1" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Order History</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list>
            <v-list-group v-for="item in orders" :key="item.id" v-model="item.completed"
              prepend-icon="mdi-calendar-text" no-action>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="'Order Number: '+item.id"></v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item v-for="item in order_items" :key="item.id">
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
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
    UpdateCustomer: {
      phone_number: null,
    },
    tab: null,
    user: {
      username: null,
      first_name: null,
      last_name: null,
    },
    query: '',
    edit: false,
    orders:[],
    order_items:[],
  }),
  methods: {
    loadCustomer() {
      if (this.$auth.loggedIn) {
        this.$axios
          .get('https://cwdstore.pythonanywhere.com/api/auth/customer/')
          .then((response) => {
            this.customer = response.data
          })
      }
    },
    UserOrders(){
      this.$axios.get('https://cwdstore.pythonanywhere.com/api/auth/customer/orders')
      .then((response) => {
        console.log(response.data)
        this.orders= response.data
      })
    },
    UpdateUser() {
      if (this.user.username == null) {
        this.user.username = this.$auth.user.username
      }
      if (this.user.first_name == null) {
        this.user.first_name = this.$auth.user.first_name
      }
      if (this.user.last_name == null) {
        this.user.last_name = this.$auth.user.last_name
      }
      this.$axios
        .put('https://cwdstore.pythonanywhere.com/api/auth/user/', this.user)
        .then((response) => {
          this.$toast.success(`Profile of ${response.data.username} Updated`)
          this.$auth.fetchUser()
          this.edit = false
          this.user.username = null
          this.user.first_name = null
          this.user.last_name = null
        })
      if (this.UpdateCustomer.phone_number != null) {
        this.$axios
          .put(
            'https://cwdstore.pythonanywhere.com/api/auth/customer/',
            this.UpdateCustomer
          )
          .then((response) => {
            this.loadCustomer()
            this.UpdateCustomer.phone_number = null
          })
      }
    },
  },
  mounted: function () {
    document.title = 'CWD : Profile'
    this.loadCustomer()
    this.UserOrders()
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