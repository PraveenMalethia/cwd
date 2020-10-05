<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm12 md7 lg7>
          <v-card shaped>
            <v-toolbar color="deep-purple darken-2" dark shaped>
              <v-toolbar-title>Checkout Form</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pa-7">
              <validation-observer ref="observer">
                <form>
                  <validation-provider
                    v-slot="{ errors }"
                    name="address"
                    rules="required"
                  >
                    <v-text-field
                      outlined
                      shaped
                      v-model="address"
                      prepend-icon="mdi-map-marker"
                      :error-messages="errors"
                      label="Address"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider v-slot="{ errors }">
                    <v-text-field
                      outlined
                      v-model="housenumber"
                      prepend-icon="mdi-home"
                      :error-messages="errors"
                      label="House Number"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Phone Number"
                    rules="required|min:10"
                  >
                    <v-text-field
                      type="text"
                      outlined
                      prepend-icon="mdi-phone"
                      v-model="phonenumber"
                      :rules="[rules.required, rules.min]"
                      :counter="10"
                      :error-messages="errors"
                      label="Phone Number"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="select"
                    rules="required"
                  >
                    <v-select
                      outlined
                      v-model="village"
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
                    auto-grow
                    outlined
                    required
                    rows="3"
                    row-height="25"
                    shaped
                    prepend-icon="mdi-information"
                  ></v-textarea>
                  <v-btn @click="clear" outlined> clear </v-btn>
                  <v-btn class="mr-4" @click="submit" color="deep-purple darken-1"> Place Order</v-btn>
                </form>
              </validation-observer>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 md4 lg4>
          <v-card class="mx-auto" max-width="344" shaped elevation="23">
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
                  small
                >
                  <div>
                    <div class="font-weight-normal">
                      <strong>{{ message.from }}</strong> @{{ message.time }}
                    </div>
                    <div>{{ message.message }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
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
    address: '',
    housenumber: '',
    phonenumber: '',
    village: null,
    errors: null,
    messages: [
        {
          from: 'You',
          message: 'Sure, I\'ll see you later.',
          time: '10:42am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'John Doe',
          message: 'Yeah, sure. Does 1:00pm work?',
          time: '10:37am',
          color: 'green',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:47am',
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
      min: (v) => v.length >= 10 || 'Min 10 Digits',
    },
  }),

  methods: {
    submit() {
      this.$refs.observer.validate().then((response) => {
        if (response == true) {
          this.$toast.success('Order Placed')
        } else {
          this.$toast.error('Please fill the details correctly')
        }
      })
    },
    clear() {
      this.address = ''
      this.housenumber = ''
      this.phonenumber = ''
      this.village = null
      this.$refs.observer.reset()
    },
  },
  mounted() {
    document.title = 'CWD : Checkout'
  },
  created() {
    document.title = 'CWD : Checkout'
  },
}
</script>


<style>
</style>