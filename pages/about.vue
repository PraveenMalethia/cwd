<template>
  <v-layout>
    <v-flex class="text-center">
      <blockquote class="blockquote">
        &#8220;Churriwala dhanna is Now going Digital.&#8221;
        <footer>
          <small>
            <em>&mdash;Parveen Malethia</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  auth: false,
  created() {
    document.title = 'CWD : About Us'
  },
  mounted() {
    document.title = 'CWD : About Us'
  }
}
</script>