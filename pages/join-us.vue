<template>
  <v-container class="pa-4 text-center">
    <v-row align="center" justify="space-around">
    <h2>Join us on Discord
      <v-icon x-large right>mdi-chevron-right</v-icon>
    </h2>
    <a target="_blank" href="https://discord.gg/xfybZUk">
      <v-btn fab icon x-large>
        <v-icon x-large>mdi-discord</v-icon>
      </v-btn>
    </a>
  </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    items: [
      {
        title: 'Facebook',
        text: "Praveen Malethia",
        subtext: 'Newly released songs. Updated daily.',
        href:'https://facebook.com/parveen.kumar.malethia',
        img: 'http://lorempixel.com/output/nightlife-q-c-640-480-5.jpg',
        icon: 'mdi-facebook',
      },
      {
        title: 'Twitter',
        text: 'Praveen Malethia',
        subtext: 'Lose yourself in rock tunes.',
        href:'https://twitter.com/PraveenMalethia?s=09',
        img:
          'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        icon: 'mdi-twitter',
      },
      {
        title: 'Instagram',
        text: 'Praveen Malethia',
        href:'http://instagram.com/praveen.malethia',
        subtext: 'Chill beats to mellow you out.',
        img: 'http://lorempixel.com/output/abstract-q-c-640-480-6.jpg',
        icon: 'mdi-instagram',
      },
    ],
    transparent: 'rgba(255, 255, 255, 0)',
  }),
  created() {
    document.title = 'NearbyStore : Join Us'
  },
}
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
a{
  text-decoration:none;
}
</style>