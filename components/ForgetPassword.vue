<template v-slot:progress>
  <v-dialog v-model="dialog" persistent max-width="700px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ml-4"
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
                v-model="user_data.email" color="green" type="email" label="Email*" required></v-text-field>
                <div class="ml-9 font-weight-bold">
                    if you don't receive an email, first, check your spam folder. If that doesnt work, 
                    it may be because you never confirmed your email address, tsk tsk. Send us an email (from the address you registered with), to 
                    <a href="mailto:developerbuilds7@gmail.com"> devloperbuilds7@gmail.com</a> ,
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
        <v-btn class="mr-4 mb-4" color="green darken-2" :loading="sending_mail"
        :disabled="sending_mail" @click="ResetPassword()">Reset password<v-icon right dark>mdi-lock-reset</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  auth: false,
  name: 'ForgetPassword',
  data() {
    return {
      user_data:{
        email:'',
      },
      loader: null,
      sending_mail:false,
      loading: false,
      dialog: false,
    }
  },
  methods: {
    ResetPassword(){
      this.sending_mail = true
      this.$axios.post('/api/auth/password/reset/',this.user_data)
      .then((response) =>{
        this.$toast.success(response.data.detail)
        this.sending_mail = false
        this.dialog = false
        this.user_data.email = ''
      })
      .catch((error) =>{
        this.sending_mail = false
        this.dialog = false
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