<template>
  <v-card class="mx-auto" max-width="500" tile>
    <v-list rounded>
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
        { text: 'Acessories', icon: 'mdi-watch-variant', to: '/categories/acessories', },
        { text: 'Electronics', icon: 'mdi-devices', to: '/categories/electronics', },
        { text: 'Fast Food', icon: 'mdi-food', to: '/categories/fast-food', },
        { text: 'Furniture', icon: 'mdi-table-furniture', to: '/categories/furniture', },
        { text: 'Household', icon: 'mdi-home-variant-outline', to: '/categories/household', },
        { text: 'Kitchen', icon: 'mdi-fridge', to: '/categories/kitchen', },
        { text: 'Smartphones', icon: 'mdi-cellphone-iphone', to: '/categories/smartphones', },
        { text: 'Sweets', icon: 'mdi-ice-cream', to: '/categories/sweets', },
      ],
    }),
  }
</script>