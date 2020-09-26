<template>
  <v-container>
    <v-flex xs12 sm12 md6>
    <v-card>
       <v-row >
        <v-col>
          <v-progress-circular class="ml-14 mt-10 mb-10 justify-center"  :size="200" :value="100" color="green">
           <img height="180" width="180" :src="'http://127.0.0.1:8000'+customer.profile_pic" alt="John">
            </v-progress-circular>
        </v-col>
        <v-col>
          <div class="grey--text text-darken-1 mt-10 ml-5">
            <h2>Username : {{$auth.user.username}}</h2>
            <h4 class="mt-5">Name : {{ $auth.user.first_name }} {{ $auth.user.last_name }}</h4>
            <h4 class="mt-5">Email : {{ $auth.user.email }}</h4>
            <h4 class="mt-5">Contact : {{customer.phone_number}}</h4>
          </div>
        </v-col>
      </v-row>
    </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    customer: {},
    messages: [
      {
        color: 'red',
        icon: 'people',
        name: 'Notifications',
        new: 1,
        total: 3,
        title: 'Twitter',
      },
      {
        color: 'teal',
        icon: 'local_offer',
        name: 'Promos',
        new: 2,
        total: 4,
        title: 'Shop your way',
        exceprt: 'New deals available, Join Today',
      },
    ],
    lorem:
      'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.',
  }),
  mounted: function () {
    if (this.$auth.loggedIn) {
      this.$axios
        .get('http://127.0.0.1:8000/api/auth/customer/')
        .then((response) => {
          this.customer = response.data
        })
    }
  },
}
</script>

<style scoped>
 img {
  border-radius: 50%;
}
</style>