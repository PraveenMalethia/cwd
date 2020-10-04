<template>
  <v-app dark>
    <br><br>
    <h1 v-if="error.statusCode === 404">
      <div class="d-flex justify-center">
        <h2>
          <glitch :text="pageNotFound" :background="false"></glitch>
        </h2>
      </div>
    </h1>
    <h1 v-else>
      <glitch :text="otherError" :background="false"></glitch>
    </h1>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="d-flex justify-center">
      <NuxtLink to="/">
      <v-btn outlined x-large rounded depressed>
      <glitch text="Home page" background="none">
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
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
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
