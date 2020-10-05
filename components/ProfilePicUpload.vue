<template>
  <form>
    <v-file-input
      :rules="rules"
      type="file"
      outlined
      placeholder="Profile Pic"
      @change="uploadImage($event)"
      accept="image/png, image/jpeg"
      prepend-icon="mdi-camera"
      label="Avatar"
    ></v-file-input>
  </form>
</template>

<script>
export default {
  name: 'ProfilePicUpload',
  data: () => ({
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        'Avatar size should be less than 2 MB!',
    ],
  }),
  methods: {
    uploadImage(event) {
      const URL = 'http://127.0.0.1:8000/api/auth/customer/'
      let data = new FormData()
      data.append('name', 'profile-picture')
      data.append('file', event.target.files[0])
      let config = {
        header: {
          'Content-Type': 'image/png',
        },
      }
      axios.put(URL, data, config).then((response) => {
        console.log('image upload response > ', response.data)
      })
    },
  },
}
</script>

<style>
</style>