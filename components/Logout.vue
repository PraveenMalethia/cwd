<template>
  <v-btn color="primary" @click="logout">Logout</v-btn>
</template>

<script>
export default {
    name: 'Logout',
    methods :{
        async logout(){
            await this.$auth.logout(/* .... */)
        }
    }
}
</script>

<style>

</style>