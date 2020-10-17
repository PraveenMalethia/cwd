<template>
  <v-container>
    <v-layout row wrap>
      <v-flex class="pa-1" xs12 sm6 md6>
        <v-card class="mx-auto" max-width="500">
        <v-card-title class="cyan darken-2">
          <span class="headline white--text">Profile</span>
          <v-spacer></v-spacer>
          <v-btn v-if="edit" text @click="UpdateUser()">Update<v-icon right>mdi-update</v-icon></v-btn>
          <v-btn dark icon @click="edit = !edit">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-card-title>
        <v-list v-if="!edit">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Username : {{ $auth.user.username }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $auth.user.first_name }} {{$auth.user.last_name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ customer.phone_number }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-gmail</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $auth.user.email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-text-field v-model="user.username" filled label="Username"
                  :placeholder="this.$auth.user.username"></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-text-field v-model="user.first_name" filled label="First Name"
                  :placeholder="this.$auth.user.first_name"></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-text-field v-model="user.last_name" filled label="Last Name"
                  :placeholder="this.$auth.user.last_name"></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-text-field filled v-model="UpdateCustomer.phone_number" label="Contact"
                  :placeholder="customer.phone_number"></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-image</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              Upload Profile Image :
            </v-list-item-content>
            <v-list-item-action>
              <form>
                <v-file-input
                  hide-input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()"
                  accept="image/png, image/jpeg" prepend-icon="mdi-camera">
                </v-file-input>
              </form>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <div v-if="!edit">
          <span v-if="customer.profile_pic">
            <v-img :src="'http://127.0.0.1:8000' + customer.profile_pic" height="100%"></v-img>
          </span>
          <span v-else>
            <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                Profile Image Not Uploaded
              </v-list-item-content>
            </v-list-item>
            </v-list>
          </span>
        </div>
      </v-card>
      </v-flex>
      <v-flex class="pa-1" xs12 sm6 md6>
        <v-card class="mx-auto" max-width="500">
          <v-toolbar color="green darken-1" dark>
            <v-toolbar-title>Order History</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-expansion-panels popout>
            <div v-if="orders.length > 0">
            <v-expansion-panel v-for="order in orders" :key="order.id">
              <v-expansion-panel-header>Order ID : {{order.id}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-alert class="mt-2" border="left" color="indigo" dark>
                  <v-row align="center">
                    <v-col class="grow">
                      Transaction Id : {{order.transaction_id}}<br>
                      Order Placed : {{order.placed}}<br>
                      Canceled : {{order.canceled}}<br>
                      Confirmed : {{order.confirmed}}<br>
                      On The Way : {{order.on_the_way}}<br>
                      Delivered from us : {{order.delivered_from_us}}<br>
                      Delivered to User : {{order.delivered_to_user}}
                    <v-col class="shrink">
                      <v-btn router to="/track-order">Track Order <v-icon right>mdi-map</v-icon></v-btn>
                    </v-col>
                    </v-col>
                  </v-row>
                </v-alert>
              </v-expansion-panel-content>
            </v-expansion-panel>
            </div>
            <div v-else>
              <v-expansion-panel>
                <v-expansion-panel-header>No Orders Have Been Placed yet . </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-btn block router to="/store" outlined>Let's Have Some Products <v-icon right>mdi-cart</v-icon></v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </div>
          </v-expansion-panels>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

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
    file: '',
    edit: false,
    orders:[],
    order_items:[],
  }),
  methods: {
    loadCustomer() {
        this.$axios
          .get('http://127.0.0.1:8000/api/auth/customer/')
          .then((response) => {
            this.customer = response.data
          })
    },
    UserOrders(){
      this.$axios.get('http://127.0.0.1:8000/api/auth/customer/orders')
      .then((response) => {
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
        .put('http://127.0.0.1:8000/api/auth/user/', this.user)
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
            'http://127.0.0.1:8000/api/auth/customer/',
            this.UpdateCustomer
          )
          .then((response) => {
            this.loadCustomer()
            this.UpdateCustomer.phone_number = null
          })
      }
    },
    onChangeFileUpload(){
        this.file = this.$refs.file.$refs.input.files[0]
        let formData = new FormData();
        formData.append('file', this.file);
        this.$axios.patch('http://127.0.0.1:8000/api/auth/customer/uplad-profile-pic/',formData,
          {headers: {'Content-Type': 'multipart/form-data'}}
        ).then((response) =>{
          this.$toast.success(response.data);
          this.loadCustomer()
          this.edit = false
        })
        .catch((error)=>{
          this.$toast.error(error.message)
          this.edit = false
        });
      }
  },
  mounted: function () {
    document.title = 'NearbyStore : Profile'
    this.UserOrders()
  },
  created() {
    this.loadCustomer()
    document.title = 'NearbyStore : Profile'
  },
}
</script>

<style scoped>
img {
  border-radius: 50%;
}
</style>