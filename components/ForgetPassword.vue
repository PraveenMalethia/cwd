<template v-slot:progress>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ma-2"
        :loading="loading"
        :disabled="loading"
        text
        v-bind="attrs"
        v-on="on"
        @click="loader = 'loading'">
        Forget Password
        <v-icon right dark>mdi-lock-reset</v-icon>
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-loading</v-icon>
          </span>
        </template>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="deep-purple darken-2" dark flat>
        <v-toolbar-title>Account Password Reset Form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <div class="mt-5 ml-9 font-weight-bold">
              Forgotten your password? Enter your e-mail address below, and we'll e-mail instructions for setting a new one.
          </div>
          <v-row>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-email" outlined
                v-model="user.email" color="green" type="email" label="Email*" required></v-text-field>
                <div class="ml-9 font-weight-bold">
                    if you don't receive an email, first, check your spam folder. If that doesnt work, 
                    it may be because you never confirmed your email address, tsk tsk. Send us an email (from the address you registered with), to 
                    <a href="mailto:developerbuilds@gmail.com"> devloperbuilds@gmail.com</a> ,
                    including your username and we will try and locate it for you.
                </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mr-4 ml-4 mb-4" text
          @click="dialog = false">Cancel
        </v-btn>
        <v-btn class="mr-4 mb-4" color="green darken-2" @click="CreateAccount()">Reset password<v-icon right dark>mdi-lock-reset</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ForgetPassword',
  data() {
    return {
      user:{
          email: '',
          username:'',
          password1: '',
          password2: '',
      },
      loader: null,
      loading: false,
      dialog: false,
      showpassword: false,
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 10 || 'Min 10 characters',
        },
    }
  },
  methods: {
    CreateAccount(){
      this.$axios.post('http://127.0.0.1:8000/api/auth/registration/',this.user)
      .then((response) =>{
        console.log(response.data)
      })
    }
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