<template>
<div>
    <v-card class="mb-3">
    <v-btn router text color="dark" retain-focus-on-click to="/">Home </v-btn>
      <v-icon>mdi-chevron-right</v-icon>
      <v-btn router small text to="/profile">Profile </v-btn>
    </v-card>
    <v-layout row wrap>
      <v-flex class="pa-1" xs12 sm6 md6>
        <v-card max-width="375" class="mx-auto">
          <span v-if="!customerLoading">
            <v-img v-if="customer.profile_pic" :src="'https://cwdstore.pythonanywhere.com' + customer.profile_pic" height="300px" dark></v-img>
            <v-img v-else 
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </span>
          <span v-else>
            <v-skeleton-loader v-bind="attrs" type="image"></v-skeleton-loader>
          </span>
            <v-row class="">
              <v-card-title>
                <v-btn dark icon router to="/">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn v-if="!edit" dark icon @click="edit = !edit" class="mr-4">
                  <v-icon >mdi-pencil</v-icon>
                </v-btn>
                <v-btn v-else dark text class="mr-4" @click="UpdateUser()">Update
                  <v-icon right>mdi-upload</v-icon>
                </v-btn>
                <v-btn dark icon router to="/profile/password-change">
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-card-title class="white--text pl-12 pt-12">
                <div class="display-1 pl-12 pt-12">
                </div>
              </v-card-title>
            </v-row>
          </v-img>
          <v-list v-if="!edit" two-line>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-account-circle
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>@{{$auth.user.username}}</v-list-item-title>
                <v-list-item-subtitle
                v-if="$auth.user.first_name && $auth.user.last_name">{{$auth.user.first_name}} {{$auth.user.last_name}}</v-list-item-subtitle>
                <v-list-item-subtitle v-else></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-phone
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <span v-if="customerLoading">
                   <v-skeleton-loader
                    v-bind="attrs"
                    type="list-item-two-line"
                  ></v-skeleton-loader>
                </span>
                <span v-else>
                <v-list-item-title v-if="customer.phone_number">{{ customer.phone_number }}</v-list-item-title>
                <v-list-item-title v-else>Phone Number not uploaded</v-list-item-title>
                <v-list-item-subtitle v-if="customer.phone_number">Mobile</v-list-item-subtitle>
                </span>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-message-text</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-email
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{$auth.user.email}}</v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list v-else>
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
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-text-field v-model="user.username" color="green" label="Username"
                  :placeholder="this.$auth.user.username"></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-text-field v-model="user.first_name" color="green" label="First Name"
                  :placeholder="this.$auth.user.first_name"></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-text-field v-model="user.last_name" color="green" label="Last Name"
                  :placeholder="this.$auth.user.last_name"></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-phone</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-text-field color="green"  v-model="UpdateCustomer.phone_number" label="Contact"
                  :placeholder="customer.phone_number"></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        </v-card>
      </v-flex>
      <v-flex class="pa-1" xs12 sm6 md6>
        <v-card class="mx-auto" max-width="500">
          <v-toolbar color="green darken-1" dark>
            <v-toolbar-title>Order History</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
            <div v-if="orders.length > 0">
          <v-expansion-panels popout>
            <v-expansion-panel v-for="order in orders" :key="order.id">
              <v-expansion-panel-header>Order ID : {{order.id}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-alert class="mt-2" border="left" color="indigo" dark>
                  <v-row align="center">
                    <v-col class="grow">
                      <h3>Order {{order.id}} Details</h3>
                      <span>
                      <v-icon left color="white">mdi-map-marker</v-icon> Tracking Id : {{order.transaction_id}}<br>
                      </span>
                      <span v-if="order.canceled">
                      <v-icon left color="red">mdi-cancel</v-icon>Canceled : Your order was cancelled due to some reasons<br>
                      </span>
                      <span v-if="order.delivered_to_user">
                      <v-icon left color="green">mdi-check</v-icon> This Order Has Been Delivered to User
                      </span>
                    <v-col v-if="!order.delivered_to_user" class="shrink">
                      <v-btn router to="/track-order">Track Order <v-icon right>mdi-map</v-icon></v-btn>
                    </v-col>
                    </v-col>
                  </v-row>
                </v-alert>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          </div>
            <div v-else>
          <v-expansion-panels popout>
              <v-expansion-panel>
                <v-expansion-panel-header>No Orders Have Been Placed yet . </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-btn block router to="/store" rounded outlined>Let's Have Some Products <v-icon right>mdi-cart</v-icon></v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
          </v-expansion-panels>
            </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    customer: {},
    customerLoading:true,
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
  activated() {
      // Call fetch again if last fetch more than 10 sec ago
      if (this.$fetchState.timestamp <= Date.now() - 10000) {
        this.$fetch()
      }
    },
  async fetch(){
    await this.$axios.get('/api/auth/customer/').then((response) => {
      this.customer = response.data
      this.customerLoading = false
      })
    await this.$axios.get('/api/auth/customer/orders').then((response) => {
      this.orders= response.data
      })
      .catch((error)=>{
        if (error.response) {
            // client received an error response (5xx, 4xx)
            } else if (error.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
      })
  },
  methods: {
    loadCustomer() {
      this.$axios.get('/api/auth/customer/').then((response) => {
        this.customer = response.data
        this.customerLoading = false
        })
      .catch((error) =>{
        if (error.response) {
        // client received an error response (5xx, 4xx)
        } else if (error.request) {
          // client never received a response, or request never left
        } else {
          // anything else
        }
      })
    },
    UserOrders(){
      this.$axios.get('/api/auth/customer/orders')
      .then((response) => {this.orders= response.data})
      .catch((error)=>{
        if (error.response) {
            // client received an error response (5xx, 4xx)
            } else if (error.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
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
        .put('/api/auth/user/', this.user)
        .then((response) => {
          this.$toast.success(`Profile of ${response.data.username} Updated`)
          this.edit = false
          this.$auth.fetchUser()
          this.user.username = null
          this.user.first_name = null
          this.user.last_name = null
        })
      if (this.UpdateCustomer.phone_number != null) {
        this.$axios
          .put(
            '/api/auth/customer/',
            this.UpdateCustomer
          )
          .then((response) => {
            this.loadCustomer()
            this.UpdateCustomer.phone_number = null
          })
          .catch((error)=>{
            if (error.response) {
            // client received an error response (5xx, 4xx)
            } else if (error.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
          })
      }
    },
    onChangeFileUpload(){
      this.file = this.$refs.file.$refs.input.files[0]
      let formData = new FormData();
      formData.append('file', this.file);
      this.$axios.patch('/api/auth/customer/uplad-profile-pic/',formData,
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
}
</script>

<style scoped>
img {
  border-radius: 50%;
}
</style>