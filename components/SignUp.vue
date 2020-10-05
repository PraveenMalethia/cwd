<template v-slot:progress>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ma-2"
        :loading="loading"
        :disabled="loading"
        color="green"
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
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                prepend-icon="mdi-account-circle"
                outlined
                v-model="user.username"
                color="green"
                label="Username*"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
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
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                prepend-icon="mdi-lock"
                outlined
                v-model="user.password1"
                color="green"
                label="Password*"
                :rules="[rules.required, rules.min]"
                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showpassword ? 'text' : 'password'"
                @click:append="showpassword = !showpassword"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                prepend-icon="mdi-lock"
                outlined
                v-model="user.password2"
                color="green"
                label="Confirm Password*"
                :rules="[rules.required, rules.min]"
                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showpassword ? 'text' : 'password'"
                @click:append="showpassword = !showpassword"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="mr-4 ml-4 mb-4"
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          <v-icon left dark>mdi-chevron-left</v-icon>Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="mr-4 mb-4"
          color="primary darken-1"
          @click="CreateAccount()">Create
          <v-icon right dark>mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Login',
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