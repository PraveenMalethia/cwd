<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm12 md5 lg5>
          <v-card class="mx-auto mb-7" max-width="400" shaped elevation="23">
              <v-toolbar color="deep-purple darken-2" dark flat shaped>
              <v-toolbar-title>Checkout Details</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div class="font-weight-bold ml-8 mb-2">Today</div>
              <v-timeline align-top dense>        
                <v-timeline-item
                  v-for="message in messages"
                  :key="message.time"
                  :color="message.color"
                  small>
                  <div>
                    <div class="font-weight-normal">
                      <strong>{{ message.from }}</strong>
                      <span v-if="message.id == 1">{{ last_added_item_date }} ago</span>
                      <span v-else >{{ message.time}}</span>
                    </div>
                    <div>{{ message.message }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 md7 lg6>
          <v-card shaped class="mb-7">
            <v-toolbar color="deep-purple darken-2" dark shaped>
              <v-toolbar-title>Checkout Form</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pa-7">
              <validation-observer ref="observer">
                <form>
                  <validation-provider
                    v-slot="{ errors }"
                    name="address"
                    rules="required">
                    <v-text-field
                      outlined
                      shaped
                      v-model="shipping.address"
                      prepend-icon="mdi-map-marker"
                      :error-messages="errors"
                      label="Address"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider v-slot="{ errors }">
                    <v-text-field
                      outlined
                      v-model="shipping.housenumber"
                      prepend-icon="mdi-home"
                      :error-messages="errors"
                      label="House Number"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Phone Number"
                    rules="required"
                  >
                    <v-text-field
                      type="text"
                      outlined
                      prepend-icon="mdi-phone"
                      v-model="shipping.phonenumber"
                      :counter="10"
                      :error-messages="errors"
                      label="Phone Number"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="select"
                    rules="required">
                    <v-select
                      outlined
                      v-model="shipping.village"
                      prepend-icon="mdi-city"
                      :items="villages"
                      :error-messages="errors"
                      label="Select Village"
                      data-vv-name="select"
                      required
                    ></v-select>
                  </validation-provider>
                  <v-textarea
                    label="Special Instructions"
                    v-model="shipping.special_instruction"
                    auto-grow
                    outlined
                    required
                    rows="3"
                    row-height="25"
                    shaped
                    prepend-icon="mdi-information"
                  ></v-textarea>
                  <v-btn @click="clear" outlined> clear </v-btn>
                  <v-btn class="mr-4" @click="submit()" color="deep-purple darken-1"> Place Order</v-btn>
                </form>
              </validation-observer>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { required, email, max } from 'vee-validate/dist/rules'
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
  components: { ValidationProvider, ValidationObserver },
  data: () => ({
    shipping:{
      address: '',
      housenumber: '',
      phonenumber: '',
      village: null,
      errors: null,
      special_instruction:'',
    },
    time_after_30_mins:'',
    last_added_item_date:'',
    messages: [
        {
          id:1,
          from: 'Last Item Added',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'Order Placement',
          message: 'Maybe Today you want to Place the order ?',
          time: 'in just a moment',
          color: 'green',
        },
        {
          from: 'Order Arrival',
          message: 'Most Probably You will get the order within 30.0 mint of placement',
          time: ' At-9:47am',
          color: 'deep-purple lighten-1',
        },
      ],
    villages: [
      'Churriwala Dhanna',
      'Nihal Khera',
      'Danger Kheda',
      'Killian wali',
    ],
    rules: {
      required: (value) => !!value || 'Required.',
    },
  }),

  methods: {
    getLastAddedProduct() {
      this.$axios
        .get('http://127.0.0.1:8000/store/cart')
        .then((response) => {
          let total = response.data.length;
          this.last_added_item_date = response.data[total-1].humanized_date
          })
    },
    submit() {
      this.$refs.observer.validate().then((response) => {
        if (response == true) {
          this.$toast.success('Order Placed')
          this.clear()
        } else {
          this.$toast.error('Please fill the details correctly')
        }
      })
    },
    clear() {
      this.shipping.address = ''
      this.shipping.housenumber = ''
      this.shipping.phonenumber = ''
      this.shipping.village = null
      this.shipping.special_instruction = ''
      this.$refs.observer.reset()
    },
    settingDeliveryTime(){
      let date = new Date();
      let hours = date.getHours();
      let days = date.getDay(); 
      let minutes = date.getMinutes()+30;
      if (minutes>=60){
        hours = hours +1
        minutes = minutes - 60
      }
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes+ ' ' + ampm;
      this.time_after_30_mins = strTime
    }
  },
  mounted() {
    document.title = 'CWD : Checkout'
    this.settingDeliveryTime()
    this.messages[2].time = "at "+ this.time_after_30_mins
  },
  created() {
    this.getLastAddedProduct()
    document.title = 'CWD : Checkout'
  },
}
</script>
<style>
</style>