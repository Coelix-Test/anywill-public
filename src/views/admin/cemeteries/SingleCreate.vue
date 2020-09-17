<!-- 
TODO:  
- Adding services
- Redirect to single edit
-->
<template>
  <div>
    <h1 class="u-margin-20">Create Cemetery</h1>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            label="Name"
            v-model="name"
            class="mt-3"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :disabled="!typeOptions.length"
            :items="typeOptions"
            v-model="type"
            item-text="name"
            item-value="id"
            label="Cemetery Type"
            class="mt-3"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
              v-model="classifications"
              :disabled="!classificationsOptions.length"
              :items="classificationsOptions"
              chips
              deletable-chips
              label="Select classifications"
              item-text="name"
              item-value="id"
              multiple
            >
              
            </v-autocomplete>
        </v-col>
        <v-col cols="12" md="2" offset-md="5">
          <v-btn dark block @click="createSingle">Create</v-btn>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import { CemeteriesApi } from '@/api';

export default {
  data: () => ({
    name: 'Cemetery 1',
    type: 1,
    classifications: [],
    coordinates: ["json"],
    options : [],
    media: [1,2],

    typeOptions: [],
    classificationsOptions: [],

  }),
  components: {
  },
  methods: {
    createSingle(){
      const postData = {
        name: this.name,
        type: this.type,
        classifications: this.classifications,
        coordinates: this.coordinates,
        options: this.options,
        media: this.media,
      };
      CemeteriesApi.create(JSON.stringify(postData));
      
    },
    getTypeOptions(){
      CemeteriesApi.getTypes().then(response => this.typeOptions = response.data);
    },
    getClassificationsOptions(){
      CemeteriesApi.getClassifications().then(response => this.classificationsOptions = response.data);
    }
  },
  mounted(){
    this.getTypeOptions();
    this.getClassificationsOptions();
  }
}
</script>

<style>

</style>