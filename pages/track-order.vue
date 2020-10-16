<template>
  <div>
    <div>
      <v-layout>
        <v-flex xs12>
          <br />
          <v-card class="mx-auto" max-width="600" shaped hover>
            <v-toolbar color="deep-purple darken-2" dark flat shaped>
              <v-toolbar-title>Track Order with Details</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <validation-observer ref="observer">
                <form><br>
                  <validation-provider v-slot="{ errors }" name="Transaction ID" rules="required|max:17">
                    <v-text-field outlined v-model="order_id" :counter="17" :error-messages="errors" label="Transaction ID" required>
                    </v-text-field>
                  </validation-provider>
                </form>
              </validation-observer>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mr-4 mb-4" text @click="clear"> clear </v-btn>
              <v-btn class="mr-10 mb-4" color="deep-purple darken-2" @click="submit"> submit </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="loading">
      <v-skeleton-loader
        v-bind="attrs"
        transition-group="slide-x-transition"
        type="article, list-item-three-line">
      </v-skeleton-loader>
    </div>
    <div v-if="fetched">
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item v-if="order_details.placed" color="purple lighten-2" fill-dot right>
          <v-card>
            <v-card-title class="purple lighten-2">
              <v-icon dark size="42" class="mr-4"> mdi-cart-check </v-icon>
              <h2 class="display-1 white--text font-weight-light">
                Order Placed
              </h2>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" md="10">
                  Your order has been placed . Your order item will be packed
                  soon after the order gets confirmed
                </v-col>
                <v-col class="hidden-sm-and-down text-right" md="2">
                  <v-icon size="47"> mdi-calendar-text </v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>
        <v-timeline-item v-if="order_details.canceled" color="amber darken-3" fill-dot left>
          <v-card>
            <v-card-title class="amber darken-3 justify-end">
              <h2 class="display-1 mr-4 white--text font-weight-light">
                Canceled
              </h2>
              <v-icon dark size="42"> mdi-cart-remove </v-icon>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" md="10">
                  Your order was cancelled due to some reason . Please
                  <nuxt-link to="/join-us"> contact us </nuxt-link>
                  for more information about the order cancelled.
                </v-col>
                <v-col class="hidden-sm-and-down" md="2">
                  <v-icon size="47"> mdi-cancel </v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>
        <v-timeline-item v-else-if="order_details.confirmed" color="cyan lighten-1" fill-dot left>
          <v-card>
            <v-card-title class="cyan lighten-1">
              <v-icon class="mr-4" dark size="42"> mdi-check </v-icon>
              <h2 class="display-1 white--text font-weight-light">Confirmed</h2>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col class="hidden-sm-and-down" md="2">
                  <v-icon size="47">mdi-check-all</v-icon>
                </v-col>
                <v-col cols="12" md="10">
                  We have recieved your order and its confirmed . Your order
                  will departure from here shortly
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>
        <v-timeline-item v-if="order_details.on_the_way" color="red lighten-1" fill-dot right>
          <v-card>
            <v-card-title class="red lighten-1 justify-end">
                <h2 class="display-1 mr-4 white--text font-weight-light">
                On the Way
                </h2>
              <v-icon dark size="42"> mdi-go-kart-track </v-icon>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col class="hidden-sm-and-down" md="2">
                  <v-icon size="47"> mdi-truck-delivery </v-icon>
                </v-col>
                <v-col cols="12" md="10">
                  Your order is now in its way . Please wait or have some
                  patience , your order will arrive soon.
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>
        <v-timeline-item v-if="order_details.delivered_from_us" color="green lighten-1" fill-dot left>
          <v-card>
            <v-card-title class="green">
              <v-icon class="mr-4" dark size="42"> mdi-check-circle </v-icon>
              <h2 class="display-1 white--text font-weight-light">
                Delivered From us
              </h2>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col class="hidden-sm-and-down" md="2">
                  <v-icon size="47"> mdi-truck-check </v-icon>
                </v-col>
                <v-col>
                  The order have been delivered to the location which was
                  submitted just before the order was placed.
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>
        <v-timeline-item v-if="order_details.delivered_to_user" color="deep-purple darken-2" fill-dot right>
          <v-card>
            <v-card-title class="deep-purple darken-2">
              <v-icon class="mr-4" dark size="42"> mdi-check-decagram </v-icon>
              <h2 class="display-1 white--text font-weight-light">
                Delivered To User
              </h2>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col class="hidden-sm-and-down" md="2">
                  <v-icon size="47"> mdi-check-underline-circle </v-icon>
                </v-col>
                <v-col>
                  You have confirmed that you have recieved the order you
                  placed.
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </div>
  </div>
</template>

<script>
import { required, max } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    attrs: {
      class: 'mb-6 mt-5',
      boilerplate: true,
      elevation: 2,
    },
    order_id: '',
    fetched: false,
    loading: false,
    errors: null,
    order_details: {},
  }),

  methods: {
    submit() {
      this.loading = true
      this.$refs.observer.validate().then((response) => {
        if (response == true) {
          this.$axios
            .post('https://cwdstore.pythonanywhere.com/store/track-order', {
              order_id: this.order_id,
            })
            .then((response) => {
              console.log(response.data)
                this.order_details = response.data
                this.fetched = true
                this.loading = false
            })
            .catch((error) =>{
            if (error.response.status == 404)
            {
              this.loading = false
              this.clear()
              this.$toast.error("Invalid Order ID")
              this.$router.push({name:'error'})
            }
            })
          this.order = true
        } else {
          this.$toast.error('Please fill the details correctly')
        }
      })
    },
    clear() {
      this.order_id = ''
      this.fetched = false
      this.$refs.observer.reset()
    },
  },
  created() {
    document.title = 'NearbyStore: Tracker'
  },
  mounted() {
    document.title = 'NearbyStore: Tracker'
  },
}
</script>

<style scoped>
.v-application a {
  color: white;
}
</style>