<template>
<v-card max-width="500">
  <v-card-text>

  <validation-observer ref="observer">
    <form>
      <validation-provider
        v-slot="{ errors }"
        name="Name"
        rules="required|max:10">
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email">
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="select"
        rules="required">
        <v-select
          v-model="select"
          :items="items"
          :error-messages="errors"
          label="Select"
          data-vv-name="select"
          required
        ></v-select>
      </validation-provider>
    </form>
  </validation-observer>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
      <v-btn @click="clear">clear</v-btn>
      <v-btn class="mr-4" @click="submit"> Reset Password</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

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
        new_password2: ''
      },
      name: '',
      email: '',
      select: null,
      errors: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
    }
  },
  methods: {
    ConfirmResetPassword(){
      let response = this.$axios.post('/api/auth/password/reset/confirm/',this.user_data)
      console.log(response.data)
    },
    submit () {
        this.$refs.observer.validate().then((response) => {
          if (response == true){
            this.ConfirmResetPassword()
          }
          else{
            this.$toast.error('Please use valid details')
          }
        })
      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
  },
}
</script>

<style>
</style>