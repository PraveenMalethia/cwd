<template>
  <form>
    <v-file-input
      :rules="rules"
      type="file"
      hide-input
      id="files" ref="files"
      placeholder="Profile Pic"
      @change="handleFilesUpload(),submitFiles()"
      accept="image/png, image/jpeg"
      prepend-icon="mdi-camera">
    </v-file-input>
  </form>
</template>
<script>
export default {
  name: 'ProfilePicUpload',
  data: () => ({
    files: '',
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        'Avatar size should be less than 2 MB!',
    ],
  }),
  methods: {
      /*
        Submits all of the files to the server
      */
      submitFiles(){
        /*
          Initialize the form data
        */
        let formData = new FormData();
        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];

          formData.append('files[' + i + ']', file);
        }
        /*
          Make the request to the POST /multiple-files URL
        */
        this.$axios.post('http://cwdstore.pythonanywhere.com/api/auth/customer/uplad-profile-pic/',
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },

      /*
        Handles a change on the file upload
      */
      handleFilesUpload(){
        this.files = this.$refs.files.files;
      }
    }
}
</script>

<style>
</style>