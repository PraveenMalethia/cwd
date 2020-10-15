<template v-slot:progress>
  <v-dialog v-model="dialog" persistent max-width="600px">
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
          <v-row>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-email"
                outlined
                v-model="user.email"
                color="green"
                type="email"
                label="Email*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mr-4 ml-4 mb-4" text
          @click="dialog = false">
          <v-icon left dark>mdi-chevron-left</v-icon>Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="mr-4 mb-4" color="green darken-1" @click="CreateAccount()">Reset<v-icon right dark>mdi-lock-reset</v-icon>
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
      this.$axios.post('https://cwdstore.pythonanywhere.com/api/auth/registration/',this.user)
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