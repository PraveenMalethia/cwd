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
                  <form>
                    <v-text-field
                      v-model="username"
                      :error-messages="usernameErrors"
                      label="Username"
                      required
                      outlined
                      color="green"
                      prepend-icon="mdi-account"
                      @input="$v.username.$touch()"
                      @blur="$v.username.$touch()"
                    ></v-text-field>
                    <v-text-field
                      v-model="email"
                      :error-messages="emailErrors"
                      label="E-mail"
                      required
                      outlined
                      color="green"
                      prepend-icon="mdi-account"
                      @input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      :error-messages="passErrors"
                      label="Password"
                      required
                      outlined
                      color="green"
                      type="password"
                      prepend-icon="mdi-lock"
                      @input="$v.password.$touch()"
                      @blur="$v.password.$touch()"
                    ></v-text-field>
                  </form>
                </v-card-text>
                <v-card-actions>
                  <div class="">
                    <SignUp />
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn @click="userLogin" class="mr-2" color="deep-purple darken-3">Login</v-btn>
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
import SignUp from '~/components/SignUp.vue'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
export default {
  components: { SignUp },
  mixins: [validationMixin],

  validations: {
    username: { required },
    password: { required },
    email: { required, email },
  },
  data() {
    return {
      loader: null,
      loading: false,
      username: '',
      email: '',
      password: '',
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
  computed: {
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username is required.')
      this.null = false
      return errors
    },
    passErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      this.null = false
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },

  methods: {
    async userLogin() {
      try {
        var login = {
          username: this.username,
          email: this.email,
          password: this.password,
        }
        let response = await this.$auth.loginWith('local', { data: login })
        this.$auth.setUserToken(response.data.key)
        this.$toast.success('Successfully authenticated')
        this.dialog = false
      } catch (err) {
        this.$toast.error('Please use valid credentials')
      }
    },
    submit() {
      this.$toast.success('Successfully authenticated')
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
    },
  },
  created() {
    document.title = 'Login : CWD Account'
  }
}
</script>

<style>
</style>