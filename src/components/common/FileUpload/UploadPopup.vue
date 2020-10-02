<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="800"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="my-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-upload</v-icon>
          Upload
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Upload files</v-card-title>

        <div class="px-6">

          <vue-dropzone
            ref="dropzoneRef"
            :id="name"
            :options="dropzoneOptions"
            :duplicateCheck="true"
            @vdropzone-sending="onBeforeUpload"
            @vdropzone-success="onAfterUpload"
          ></vue-dropzone>

          <v-simple-table v-if="files.length">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Preview
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="file in files"
                  :key="file.id"
                >
                  <td>{{file.id}}</td>
                  <td>{{ file.name }}</td>
                  <td><v-progress-linear :value="file.progress"></v-progress-linear></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>

        

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import vueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

import { mapMutations } from 'vuex';

import { FilesApi } from '@/api';

export default {
  data: () => ({
    files: [],
    dialog: false,
    name: 'files',

    dropzoneOptions: {
      url: process.env['VUE_APP_API_URL'] + '/media',
      thumbnailWidth: 100,
      thumbnailHeight: 100,
      maxFilesize: 10,
    }
    
  }),
  components: {
    vueDropzone,
  },
  watch: {
    dialog(){
      if(!this.dialog){
        //If you don't want files that are currently uploading to be canceled, remove 'true' parameter
        this.$refs.dropzoneRef.removeAllFiles(true);
      }
    }
  },
  methods: {
    ...mapMutations({
      addFile: 'Files/addFile',
    }),
    onBeforeUpload(file, xhr, formData){
      formData.append('files[]', file);
      formData.delete('file');
    },
    onAfterUpload(file, response){
      //push files to vuex
      if(file.status === 'success' && response[0]){
        this.addFile({
          id: response[0],
          type: file.type,
          name: file.upload.filename,
        });
      }
    },
  },
}
</script>

<style lang="scss">

</style>