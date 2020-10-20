<template v-slot:progress>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ml-7 mb-5"
        :loading="loading"
        :disabled="loading"
        text
        v-bind="attrs"
        v-on="on"
        @click="loader = 'loading'"
      >
        Create
        <v-icon right dark>mdi-account</v-icon> ?
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-loading</v-icon>
          </span>
        </template>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="deep-purple darken-2" dark flat>
        <v-toolbar-title>Create Account form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <validation-observer
    ref="observer">
        <form>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <validation-provider
                v-slot="{ errors }"
                name="Username"
                rules="required">
              <v-text-field
                prepend-icon="mdi-account-circle"
                outlined
                :error-messages="errors"
                v-model="user_info.username"
                color="green"
                :rules="[rules.required]"
                label="Username*"
              ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <validation-provider
                v-slot="{ errors }"
                name="email"
                rules="required|email">
              <v-text-field
                prepend-icon="mdi-email"
                outlined :error-messages="errors"
                v-model="user_info.email"
                color="green"
                type="email"
                label="Email*"
                required
              ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                prepend-icon="mdi-lock"
                outlined
                v-model="user_info.password1"
                color="green"
                label="Password*"
                :rules="[rules.required, rules.min]"
                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showpassword ? 'text' : 'password'"
                @click:append="showpassword = !showpassword"
                required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                prepend-icon="mdi-lock"
                outlined :error-messages="errors"
                v-model="user_info.password2"
                color="green"
                label="Confirm Password*"
                :rules="[rules.required, rules.min]"
                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showpassword ? 'text' : 'password'"
                @click:append="showpassword = !showpassword"
                required
              ></v-text-field>
            </v-col>
              <v-col cols="12" sm="12" md="6">
              <TermsAndConditions/>
              </v-col>
              <v-col cols="12" sm="12" md="3">
              <validation-provider rules="required" name="checkbox">
                <v-checkbox
                  v-model="checkbox"
                  :error-messages="errors"
                  label="Accept"
                  type="checkbox"
                  required></v-checkbox>
              </validation-provider>
              </v-col>
          </v-row>
        </v-container>
        </form>
        </validation-observer>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mr-4 ml-4 mb-4" text
          @click="dialog = false">
          <v-icon left dark>mdi-chevron-left</v-icon>Close
        </v-btn>
        <v-btn class="mr-4 mb-4" color="green darken-2" :loading="creating"
          :disabled="creating" @click="submit()">Create<v-icon right dark>mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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

extend('email', {
  ...email,
  message: 'Email must be valid',
})
import TermsAndConditions from './TermsAndConditions'
export default {
  auth: false,
  components: {
    TermsAndConditions,
  },
  name: 'Login',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      user_info: {
        email: '',
        username: '',
        password1: '',
        password2: '',
      },
      loader: null,
      errors: null,
      checkbox: true,
      loading: false,
      dialog: false,
      creating:false,
      showpassword: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 10 || 'Min 10 characters',
      },
    }
  },
  methods: {
    submit() {
      this.$refs.observer.validate().then((response) => {
        if (response == true){
          if (this.user_info.password1 == this.user_info.password2) {
            this.creating = true
            this.$axios
              .post('/api/auth/registration/', this.user_info)
              .then((response) => {
                this.$auth.setUserToken(response.data.key)
                this.$toast.success('Account created successfully')
                this.creating = false
                this.dialog = false
              })
              .catch((error) => {
                this.creating = false
                this.dialog = false
                if (error.response) {
                  console.log(error.response)
              } else if (error.request) {
                console.log(error.request)
              } else {
                console.log(error)
              }
              })
          }
          else{
            this.$toast.error("Both password doesn't match")
          }
        }
      })
    },
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 300)
      this.loader = null
    },
  },
}
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>