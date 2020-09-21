<template>
  <h1>Welcome to your profile page</h1>
</template>

<script>
export default {
  mounted:function(){
    if (this.$auth.loggedIn) {
      this.$axios.get('http://127.0.0.1:8000/api/auth/customer/')
        .then((response) =>{
           this.customer = response.data
           console.log("customer set")
        })
    }
  }
}
</script>

<style>

</style>