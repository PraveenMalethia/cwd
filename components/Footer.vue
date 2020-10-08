<template>
  <v-footer dark padless>
    <v-card flat tile class="indigo lighten-1 white--text text-center">
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
        class="white--text pt-0"
      >Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</v-card-text>
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
</style>