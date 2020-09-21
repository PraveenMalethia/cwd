<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
  export default {
    auth: false,
    data: () => ({
      items: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Categories',
          disabled: false,
          href: '/categories',
        },
        {
          text: 'Kitchen',
          disabled: true,
          href: '/categories/kitchen',
        },
      ],
    }),
  }
</script>

<style>

</style>