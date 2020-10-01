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
          color="primary"
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
          <label :for="name" class="dropzone">
            <div class="dropzone__main-caption text-h6">Drop files anywhere or click to upload.</div>
            <div class="dropzone__accepted">(Accepted extensions: {{extensions}})</div>
          </label>

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

        <file-upload-comp
          :input-id="name"
          :name="name"
          :accept="accept"
          :multiple="multiple"
          :drop="drop"
          :directory="directory"
          :drop-directory="dropDirectory"
          :extensions="extensions"
          ref="upload"
          v-model="files"
          :custom-action="handleFileUpload"
        ></file-upload-comp>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
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
import FileUploadComp from 'vue-upload-component/dist/vue-upload-component.part.js';
import { FilesApi } from '@/api';

export default {
  data: () => ({
    files: [],
    dialog: false,

    accept: 'image/png,image/gif,image/jpeg,image/webp',
    multiple: true,
    drop: true,
    directory: false,
    dropDirectory: false,
    extensions: 'gif,jpg,jpeg,png,webp',
    name: 'files',
  }),
  components: {
    FileUploadComp,
  },
  methods: {
    // $refs.upload.active
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        // Add file
        if(!this.$refs.upload.active){
          this.$refs.upload.active = true;
        }
        console.log('start file upload');
      }
    },
    handleFileUpload: async function(file){
      return await FilesApi.upload();
    },
  },
}
</script>

<style lang="scss">
@import "~vue-upload-component/dist/vue-upload-component.part.css";

.dropzone{
  border: 2px dashed #0087F7;
  border-radius: 5px;
  background: white;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  
}
</style>