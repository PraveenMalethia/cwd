<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-text>
      <p class="display-1 text--primary">Report Bug Or Feeback</p>
      <div class="text--primary">
        well meaning and kindly.
        <br />"a benevolent smile"
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="deep-purple accent-4">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  auth: false,
  created(){
    document.title = 'CWD : Feedback'
  },
  mounted() {
    document.title = 'CWD : Feedback'
  }
}
</script>

<style>
</style>