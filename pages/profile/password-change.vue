<template>
  <validation-observer
    ref="observer">
    <form>
      <validation-provider
        v-slot="{ errors }"
        name="Name"
        rules="required|max:20">
        <v-text-field
          v-model="old_password"
          outlined
          :error-messages="errors"
          label="Name"
          required></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="Name"
        rules="required|max:10">
        <v-text-field
          v-model="new_password1"
          outlined
          :error-messages="errors"
          label="Name"
          required></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="Name"
        rules="required|max:10">
        <v-text-field
          v-model="new_password2"
          outlined
          :error-messages="errors"
          label="Name"
          required></v-text-field>
      </validation-provider>
      <v-btn class="mr-4" @click="submit"> submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </validation-observer>
</template>
<script>
  import { required, email, max } from 'vee-validate/dist/rules'
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
    activated() {
      // Call fetch again if last fetch more than 1 sec ago
      if (this.$fetchState.timestamp <= Date.now() - 1000) {
        this.$fetch()
      }
    },
    data: () => ({
      old_password:'',
      new_password1:'',
      new_password2:'',
      errors: null,
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.old_password = ''
        this.new_password1 = ''
        this.new_password2 = ''
        this.$refs.observer.reset()
      },
    },
  }
</script>