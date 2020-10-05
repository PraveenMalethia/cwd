<template>
  <div>
    <HomeCarousel />
    <v-layout row wrap>
      <v-flex v-for="card in cards" :key="card.id" xs12 sm6 md4 lg4 xl4 class="pt-10">
        <v-card shaped elevation="20" class="mx-auto" max-width="344" router to="/">
          <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>
          <v-card-title justify="center" >{{card.title}}</v-card-title>
          <v-card-subtitle>{{card.desc}}</v-card-subtitle>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex class="pt-10">
        <v-card class="mx-auto" color="#26c6da" dark max-width="400">
          <v-card-title>
            <v-icon large left>mdi-reddit</v-icon>
            <span class="title font-weight-light">Reddit</span>
          </v-card-title>
          <v-card-text
            class="headline font-weight-bold"
          >"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."</v-card-text>
          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Parveen</v-list-item-title>
              </v-list-item-content>
              <v-row align="center" justify="end">
                <v-icon class="mr-1">mdi-heart</v-icon>
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">mdi-share-variant</v-icon>
                <span class="subheading">45</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import HomeCarousel from '~/components/HomeCarousel.vue'
export default {
  auth: false,
  components: { HomeCarousel },
  data() {
    return {
      cards: [
        {
          id: 1,
          title: 'Fast Delivery',
          desc: 'Happines is also , When things arrive before expected time !',
        },
        {
          id: 2,
          title: 'Hygenic Products',
          desc: 'We deliver products which are clean and safe to use !',
        },
        {
          id: 3,
          title: 'Reliable Payments',
          desc: 'Pay after delivery of the product, Either with cash or Cashless !',
        },
      ],
    }
  },
  created() {
    document.title = 'CWD : Home'
  },
  mounted() {
    document.title = 'CWD : Home'
  }
}
</script>
