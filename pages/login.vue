<template>
  <div>
    <div v-if="$auth.loggedIn"></div>
    <div v-else>
      <div>
        <SignUp />
      </div>
      <div>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-2"
              :loading="loading"
              :disabled="loading"
              color="purple"
              v-bind="attrs"
              v-on="on"
              @click="loader = 'loading'"
            >
              Login
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-loading</v-icon>
                </span>
              </template>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">User Login</span>
            </v-card-title>
            <v-card-text>
              <form>
                <v-text-field
                  v-model="username"
                  :error-messages="usernameErrors"
                  label="Username"
                  required
                  @input="$v.username.$touch()"
                  @blur="$v.username.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="E-mail"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :error-messages="passErrors"
                  label="Password"
                  required
                  type="password"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                ></v-text-field>
                <v-btn class="mr-4" @click="userLogin">submit</v-btn>
                <v-btn @click="clear">close</v-btn>
              </form>
            </v-card-text>
          </v-card>
        </v-dialog>
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
      dialog: true,
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
      } catch (err){
        this.$toast.error("Please use valid credentials")
      }
    },
    submit() {
      this.$toast.success('Successfully authenticated')
      this.dialog = false
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.dialog = false
    },
  },
}
</script>

<style>
</style>