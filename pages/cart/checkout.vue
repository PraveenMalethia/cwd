<template>
  <div>
    <v-card>
      <v-toolbar color="deep-purple darken-2" dark flat>
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
                v-model="address"
                prepend-icon="mdi-map-marker"
                :error-messages="errors"
                label="Address"
                required></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }">
              <v-text-field
                outlined
                v-model="housenumber"
                prepend-icon="mdi-home"
                :error-messages="errors"
                label="House Number"
                required></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Phone Number"
              rules="required|min:10">
              <v-text-field
                type="text"
                outlined
                prepend-icon="mdi-phone"
                v-model="phonenumber"
                :rules="[rules.required, rules.min]"
                :counter="10"
                :error-messages="errors"
                label="Phone Number"
                required></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="select"
              rules="required">
              <v-select
                outlined
                v-model="village"
                prepend-icon="mdi-city"
                :items="villages"
                :error-messages="errors"
                label="Select Village"
                data-vv-name="select"
                required></v-select>
            </validation-provider>
            <v-textarea
              label="Special Instructions"
              auto-grow
              outlined
              required
              rows="3"
              row-height="25"
              shaped
              prepend-icon="mdi-information"></v-textarea>
            <v-btn class="mr-4" @click="submit" color="deep-purple darken-1">
              Place Order
            </v-btn>
            <v-btn @click="clear"> clear </v-btn>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
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
    villages: [
      'Churriwala Dhanna',
      'Nihal Khera',
      'Danger Kheda',
      'Killian wali',
    ],
    rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 10 || 'Min 10 Digits',
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