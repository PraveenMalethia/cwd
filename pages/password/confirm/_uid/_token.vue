<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-card class="max-auto elevation-12" shaped>
        <v-toolbar color="deep-purple darken-2" dark flat shaped>
          <v-toolbar-title>Password Reset</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <validation-observer ref="observer">
            <form class="mt-5">
              <validation-provider
                v-slot="{ errors }"
                name="New Password"
                rules="required">
                <v-text-field
                  outlined
                  color="green"
                  v-model="user_data.new_password1"
                  :error-messages="errors"
                  label="New Password"
                  required prepend-icon="mdi-fingerprint"
                  :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showpassword ? 'text' : 'password'"
                @click:append="showpassword = !showpassword"
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Confirm New Password"
                rules="required"
              >
                <v-text-field
                  outlined
                  color="green"
                  v-model="user_data.new_password2"
                  :error-messages="errors"
                  label="Confirm New Password"
                  required
                  prepend-icon="mdi-fingerprint"
                  :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showpassword ? 'text' : 'password'"
                @click:append="showpassword = !showpassword"
                ></v-text-field>
              </validation-provider>
            </form>
          </validation-observer>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mb-10 ml-7 mr-5" text @click="clear">clear</v-btn>
          <v-btn class="mb-10 mr-5" color="green darken-2" @click="submit">
            Reset Password</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { required } from 'vee-validate/dist/rules'
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
export default {
  auth: false,
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      user_data: {
        uid: `${this.$route.params.uid}`,
        token: `${this.$route.params.token}`,
        new_password1: '',
        new_password2: '',
      },
      showpassword: false,
      name: '',
      email: '',
      errors: null,
    }
  },
  methods: {
    ConfirmResetPassword() {
      this.$axios
        .post('/api/auth/password/reset/confirm/', this.user_data)
        .then((response) => {
          this.$toast.success(response.data.detail)
          this.$router.push('/login')
        })
        .catch((error) => {
          if (error.response) {
            // client received an error response (5xx, 4xx)
            } else if (error.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
        })
    },
    submit() {
      this.$refs.observer.validate().then((response) => {
        if (response == true) {
          if(this.user_data.new_password1 == this.user_data.new_password2){
            this.ConfirmResetPassword()
          }
          else{
          this.$toast.error('Both password must have to be same')
          }
        } else {
          this.$toast.error('Please use valid details')
        }
      })
    },
    clear() {
      this.user_data.new_password1= ''
      this.user_data.new_password2= ''
      this.$refs.observer.reset()
    },
  },
}
</script>

<style>
</style>