<template>
  <v-menu open-on-hover top offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="dark" dark v-bind="attrs" text v-on="on">Developer
        <v-icon right dark>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link target="_blank" :href="item.link">
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'Community',
  data: () => ({
    items: [
      { title: 'Instagram' ,link:"https://instagram.com/praveen.malethia"},
      { title: 'Facebook' ,link:"https://facebook.com/parveen.kumar.malethia"},
      { title: 'Twitter' ,link:"https://twitter.com/PraveenMalethia?s=09"},
      { title: 'Github' ,link:"https://github.com/developerbuilds"},
    ],
  }),
}
</script>

<style>
</style>