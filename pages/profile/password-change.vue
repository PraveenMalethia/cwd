<template>
<div>
    <v-card class="mb-3">
    <v-btn router text color="dark" retain-focus-on-click to="/">Home </v-btn>
      <v-icon>mdi-chevron-right</v-icon>
      <v-btn router small text to="/profile">Profile</v-btn>
      <v-icon>mdi-chevron-right</v-icon>
      <v-btn router small text to="/profile/password-change">Change Password</v-btn>
    </v-card>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Change Your Password</div>
        <v-list-item-title class="headline mb-1">
          <validation-observer ref="observer">
            <form>
              <validation-provider
                v-slot="{ errors }"
                name="Old Password"
                rules="required|max:20">
                <v-text-field
                  v-model="passwords.old_password"
                  outlined required
                  :error-messages="errors"
                  label="Old Password"
                  class="mt-4"
                  prepend-icon="mdi-lock"
                  @click:append="show_old = !show_old"
                  :append-icon="show_old ? 'mdi-eye' : 'mdi-eye-off'" :type="show_old ? 'text' : 'password'"
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="New Password"
                rules="required|max:20">
                <v-text-field
                  v-model="passwords.new_password1"
                  outlined required
                  :error-messages="errors"
                  label="New Password"
                  prepend-icon="mdi-fingerprint"
                  @click:append="show = !show"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'"
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Confirm New Password"
                rules="required|max:20">
                <v-text-field
                  v-model="passwords.new_password2"
                  outlined required
                  :error-messages="errors"
                  label="Confirm New Password"
                  prepend-icon="mdi-fingerprint"
                  @click:append="show = !show"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'"
                ></v-text-field>
              </validation-provider>
            </form>
          </validation-observer>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mr-4 mb-5" @click="clear" outlined rounded text> clear </v-btn>
        <v-btn class="mr-4 mb-5" outlined rounded @click="submit"> submit </v-btn>
    </v-card-actions>
  </v-card>
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
  activated() {
    // Call fetch again if last fetch more than 1 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 1000) {
      this.$fetch()
    }
  },
  data: () => ({
      show_old:false,
    show: false,
    passwords: {
      old_password: '',
      new_password1: '',
      new_password2: '',
    },
    errors: null,
  }),

  methods: {
    submit() {
      this.$refs.observer.validate().then((response) => {
        if (response == true) {
          if(this.passwords.new_password1 == this.passwords.new_password2){
            this.$axios
            .post(
              '/api/auth/password/change/',
              this.passwords
            )
            .then((response) => {
              this.$toast.success(response.data.detail)
              this.clear()
              this.$router.push('/profile')
            })
            .catch((error)=>{
              this.$toast.error('Please Try again with valid credentials')
              if (error.response) {
            // client received an error response (5xx, 4xx)
            } else if (error.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
            })
          }
          else{
            this.$toast.error("Both password aren't equal")
          }
        }
      })
    },
    clear() {
      this.passwords.old_password = ''
      this.passwords.new_password1 = ''
      this.passwords.new_password2 = ''
      this.$refs.observer.reset()
    },
  },
}
</script>