<template>
  <v-app dark>
    <br><br>
    <br><br>
    <br><br>
    <div v-if="error.statusCode === 404">
      <div class="d-flex justify-center">
        <h2 class="font-weight-bold">
          <glitch :text="pageNotFound" background="none"></glitch>
        </h2>
      </div>
    </div>
    <h1 v-else>
      <glitch :text="otherError" background="none"></glitch>
    </h1>
    <br><br>
    <div class="d-flex justify-center">
      <NuxtLink to="/">
      <v-btn outlined x-large rounded depressed>
      <glitch text="Get me out of here!" background="none">
      </glitch>
      </v-btn>
      </NuxtLink>
    </div>
  </v-app>
</template>

<script>
import Glitch from 'vue-glitch';
export default {
  layout: 'empty',
  components: { Glitch },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Whoops, 404',
      otherError: 'An error occurred or The page you were looking for does not exist'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
a {
  text-decoration:none;
}
</style>
