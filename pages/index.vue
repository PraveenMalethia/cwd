<template>
  <div>

  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
      </div>
      <div>
      </div>
    </v-flex>
  </v-layout>
  </div>
</template>
<script>
//import Logo from '~/components/Logo.vue'

  export default {
    auth: false,
    data () {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
      }
    },
  }
</script>
