<template>
  <v-footer dark padless>
    <v-card flat tile class="deep-purple darken-1 white--text text-center">
      <v-card-text>
        <span v-for="social in socials" :key="social.id">
        <a :href="social.href" target="_blank">
        <v-btn class="mx-4 white--text" icon>
          <v-icon size="24px">{{ social.icon }}</v-icon>
        </v-btn>
        </a>
        </span>
      </v-card-text>
      <v-card-text
        class="white--text pt-0">
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>CWD Shoppy</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    socials: [
      {
        id:1,
        icon: 'mdi-facebook',
        href: 'https://facebook.com/parveen.kumar.malethia'
      },
      {
        id:2,
        icon: 'mdi-twitter',
        href: 'https://twitter.com/PraveenMalethia?s=09'
      },
      {
        id:3,
        icon: 'mdi-linkedin',
        href: 'https://linkedin.com/in/parveen-kumar-601060143'
      },
      {
        id:4,
        icon: 'mdi-instagram',
        href: 'https://instagram.com/praveen.malethia'
      },
    ],
  }),
}
</script>

<style>
.v-card--flat{
  width:100%;
}
</style>