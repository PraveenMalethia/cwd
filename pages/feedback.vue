<template>
<div>
  <v-card class="mb-3">
    <v-btn router text color="dark" retain-focus-on-click to="/">Home </v-btn>
      <v-icon>mdi-chevron-right</v-icon>
      <v-btn router text to="/feedback">Feedback </v-btn>
    </v-card>
  <v-card shaped class="mx-auto" max-width="500">
    <v-toolbar color="deep-purple darken-2" dark flat shaped>
      <v-toolbar-title>Feedback Or Report Bug</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <validation-observer ref="observer">
    <form>
      <br>
      <validation-provider v-slot="{ errors }" name="Subject" rules="required|max:50">
        <v-text-field outlined shaped v-model="data.subject" :error-messages="errors" label="Subject" required></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="Details" rules="required|max:2000">
        <v-textarea auto-grow outlined required rows="10" row-height="20" v-model="data.details" :counter="2000" :error-messages="errors" label="Details" ></v-textarea>
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
</div>
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
  components: {ValidationProvider,ValidationObserver,},
  auth: false,
  data: () => ({
    data:{subject: '',details:'',},
    errors: null,
  }),
  methods: {
    submit () {
      this.$refs.observer.validate().then((response) => {
        if (response == true){
          this.$axios.post('http://127.0.0.1:8000/store/feedback',this.data)
          .then((response) => {
            this.$toast.success(`Feedback ${response.data.subject} submitted`)
            this.clear()
          })
          .catch((error) => {
            console.log(error.message)
          })
        }
      })
    },
    clear(){
      this.data.subject = ''
      this.data.details = ''
      this.$refs.observer.reset()
    },
  },
}
</script>