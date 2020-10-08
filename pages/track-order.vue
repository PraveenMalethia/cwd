<template>
  <div>
    <!-- <div v-if="order.placed">
    </div>
    <div v-else>
    </div> -->
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item color="purple lighten-2" fill-dot right>
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
                Your order has been placed . Your order item will be packed soon after the order gets confirmed
              </v-col>
              <v-col class="hidden-sm-and-down text-right" md="2">
                <v-icon size="64"> mdi-calendar-text </v-icon>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="amber darken-3" fill-dot left>
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
                <nuxt-link to="/join-us">
                  contact us
                </nuxt-link>
                for more information about the order cancelled.
              </v-col>
              <v-col class="hidden-sm-and-down" md="2">
                <v-icon size="64"> mdi-cancel </v-icon>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="cyan lighten-1" fill-dot right>
        <v-card>
          <v-card-title class="cyan lighten-1">
            <v-icon class="mr-4" dark size="42"> mdi-check </v-icon>
            <h2 class="display-1 white--text font-weight-light">Confirmed</h2>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col class="hidden-sm-and-down" md="2">
                <v-icon size="64"> mdi-check-all </v-icon>
              </v-col>
              <v-col cols="12" md="10">
                We have recieved your order and its confirmed . Your order will departure from here shortly
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="red lighten-1" fill-dot left>
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
                <v-icon size="64"> mdi-truck-delivery </v-icon>
              </v-col>
              <v-col cols="12" md="10">
                Your order is now in its way . Please wait or have some patience , your order will arrive soon.
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="green lighten-1" fill-dot right>
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
                <v-icon size="64"> mdi-truck-check </v-icon>
              </v-col>
              <v-col>
                The order have been delivered to the location which was submitted just before the order was placed.
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="deep-purple darken-2" fill-dot left>
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
                <v-icon size="64"> mdi-check-underline-circle </v-icon>
              </v-col>
              <v-col>
                You have confirmed that you have recieved the order you placed .
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
export default {
  created() {
    document.title = 'CWD : Tracker'
  },
  mounted() {
    document.title = 'CWD : Tracker'
  },
}
</script>

<style scoped>
.v-application a {
  color: white
}
</style>