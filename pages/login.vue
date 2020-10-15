<template>
  <div>
    <div v-if="$auth.loggedIn"></div>
    <div v-else>
      <div>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" xl="4" lg="5">
              <v-card class="max-auto elevation-12">
                <v-toolbar color="deep-purple darken-2" dark flat>
                  <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <validation-observer ref="observer">
                    <form>
                    <validation-provider v-slot="{ errors }" name="username" rules="required">
                      <v-text-field v-model="username" label="Username" required
                        outlined color="green" prepend-icon="mdi-account" :error-messages="errors"></v-text-field>
                      </validation-provider>
                      <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                      <v-text-field v-model="email" label="E-mail" required outlined :error-messages="errors"
                        color="green" prepend-icon="mdi-account"></v-text-field>
                      </validation-provider>
                      <validation-provider v-slot="{ errors }" name="password" rules="required">
                      <v-text-field v-model="password" label="Password" required outlined
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                        color="green" prepend-icon="mdi-lock" :error-messages="errors"></v-text-field>
                      </validation-provider>
                    </form>
                  </validation-observer>
                  <ForgetPassword/>
                </v-card-text>
                <v-card-actions>
                  <SignUp />
                  <v-spacer></v-spacer>
                  <v-btn @click="userLogin" class="mr-2" color="deep-purple darken-3">Login
                    <v-icon right>mdi-login</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider,setInteractionMode,} from 'vee-validate'
setInteractionMode('eager')
extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})
extend('email', {
    ...email,
    message: 'Email must be valid',
  })
import SignUp from '~/components/SignUp.vue'
import ForgetPassword from '~/components/ForgetPassword.vue'
export default {
  components: { SignUp ,ValidationProvider, ValidationObserver , ForgetPassword},

  validations: {
    username: { required },
    password: { required },
    email: { required, email },
  },
  data() {
    return {
      show: false,
      loader: null,
      loading: false,
      errors: null,
      username: '',
      email: '',
      password: '',
      rules: {
      required: (value) => !!value || 'Required.',
    },
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 500)
      this.loader = null
    },
  },
  methods: {
    userLogin() {
    this.$refs.observer.validate().then((response) => {
        if (response == true)
        {
              var login = 
              {
                    username: this.username,
                    email: this.email,
                    password: this.password,
              }
              this.$auth.loginWith('local', { data: login })
              .then((response) => {
                this.$auth.setUserToken(response.data.key)
                this.$toast.success('Successfully authenticated')
                this.dialog = false
              })
              .catch(err => {
                  if (err.response) {
      // client received an error response (5xx, 4xx)
    } else if (err.request) {
      // client never received a response, or request never left
    } else {
      console.log('error')
    }})
        }
        })
    },
  },
  mounted() {
    document.title = 'Login : CWD Account'
  }
}
</script>

<style>
</style>