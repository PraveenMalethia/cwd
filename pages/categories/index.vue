<template>
  <v-card class="mx-auto" max-width="500" tile>
    <v-list shaped>
      <v-subheader>CATEGORIES</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router>
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    auth: false,
    data: () => ({
      items: [
        { text: 'Household', icon: 'mdi-home', to: '/categories/household', },
        { text: 'Kitchen', icon: 'mdi-fridge', to: '/categories/kitchen', },
        { text: 'Fast Food', icon: 'mdi-food', to: '/categories/fast-food', },
      ],
    }),
    created(){
      document.title = 'CWD : Categories'
    },
    mounted(){
      document.title = 'CWD : Categories'
    }
  }
</script>

<style>
.router-link{
  text-decoration:none;
}
</style>