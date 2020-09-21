<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ma-2"
        :loading="loading"
        :disabled="loading"
        color="red"
        v-bind="attrs"
        v-on="on"
        @click="loader = 'loading'"
      >
        Create Account
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-loading</v-icon>
          </span>
        </template>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Register Account</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="first name*" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="last name*"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="email" label="Email*" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Password*" type="password" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field label="Confirm Password*" type="password" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
             <v-switch inset v-model="switch1" :label="`Show Password`"></v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          <v-icon left dark>mdi-chevron-left</v-icon>
          Close</v-btn>
        <v-btn color="primary darken-1" @click="dialog = false">Create
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
      loader: null,
      loading: false,
      dialog: false,
      switch1: false,
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