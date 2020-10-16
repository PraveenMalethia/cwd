<template>
  <v-card shaped class="mx-auto" max-width="500">
    <v-toolbar color="deep-purple darken-2" dark flat shaped>
      <v-toolbar-title>Feedback Or Report Bug</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <validation-observer ref="observer">
    <form>
      <br>
      <validation-provider v-slot="{ errors }" name="Subject" rules="required|max:50">
        <v-text-field outlined shaped v-model="subject" :error-messages="errors" label="Subject" required></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="Details" rules="required|max:2000">
        <v-textarea auto-grow outlined required rows="10" row-height="20" v-model="details" :counter="2000" :error-messages="errors" label="Details" ></v-textarea>
      </validation-provider>
    </form>
  </validation-observer>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="mr-4 mb-4" @click="clear" text>clear</v-btn>
      <v-btn class="mr-10 mb-4" @click="submit" color="deep-purple darken-2"> submit</v-btn>
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
    document.title = 'NearbyStore : Feedback'
  },
  mounted() {
    document.title = 'NearbyStore : Feedback'
  }
}
</script>

<style>
</style>