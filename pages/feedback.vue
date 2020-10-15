<template>
  <v-card shaped class="mx-auto" max-width="500">
    <v-toolbar color="deep-purple darken-2" dark flat shaped>
      <v-toolbar-title>Feedback Or Report Bug</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <validation-observer ref="observer">
    <form>
      <validation-provider v-slot="{ errors }" name="Subject" rules="required|max:50">
        <v-text-field v-model="subject" :error-messages="errors" label="Subject" required></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="Details" rules="required|max:2000">
        <v-text-field v-model="details" :counter="2000" :error-messages="errors" label="Details" required></v-text-field>
      </validation-provider>
    </form>
  </validation-observer>
    </v-card-text>
    <v-card-actions>
      <v-btn class="ml-4 mb-4" @click="clear" text>clear</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="mr-4 mb-4" @click="submit" color="green darken-1"> submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { required,max} from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })
  extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
  })
export default {
  components: {
      ValidationProvider,
      ValidationObserver,
    },
  auth: false,
  data: () => ({
      subject: '',
      details:'',
      errors: null,
    }),
  methods: {
      submit () {
        this.$refs.observer.validate().then((response) => {
          if (response == true){
            this.$toast.success("Feedback submitted")
            this.clear()
          }
        })
      },
      clear () {
        this.subject = ''
        this.details = ''
        this.$refs.observer.reset()
      },
    },
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