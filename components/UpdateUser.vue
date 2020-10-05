<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ml-5 mb-5" v-bind="attrs" v-on="on" icon outlined>
        <v-icon dark>mdi-account-edit</v-icon>
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-loading</v-icon>
          </span>
        </template>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="deep-purple darken-2" dark flat>
        <v-toolbar-title>Account Update form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
              <v-col cols="12" sm="6" md="6">
              <v-text-field prepend-icon="mdi-account-circle"
                outlined shaped :value="this.$auth.user.first_name" color="green"
                label="First Name*"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field prepend-icon="mdi-account-circle" outlined shaped
                :value="this.$auth.user.last_name" color="green" label="Last Name*">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field prepend-icon="mdi-account-circle" outlined
                :value="this.$auth.user.username" color="green" label="Username*">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field prepend-icon="mdi-email"
                outlined :value="this.$auth.user.email" color="green"
                type="email" label="Email*" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="mr-4 ml-4 mb-4"
          color="blue darken-1" text
          @click="dialog = false">
          <v-icon left dark>mdi-chevron-left</v-icon>Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="mr-4 mb-4"
          color="primary darken-1"
          @click="UpdateAccount()">Update
          <v-icon right dark>mdi-update</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
    name: 'UpdateUser',
    data(){
        return {
            dialog: false,
            user:{
                username:''
            }
        }
    },
    methods: {
        UpdateAccount(){
            this.dialog = false
            this.$toast.success("User updated")
        }
    }
}
</script>
<style>

</style>