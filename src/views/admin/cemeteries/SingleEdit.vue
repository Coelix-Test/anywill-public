<template>
  <div>
    <h1 class="u-margin-20">Edit Cemetery </h1>
    <div class="u-margin-20">
      <vs-input class="block" v-model="name" label="Name" />
    </div>

    <vs-row>
      <vs-col class="u-padding-20" vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <vs-select 
          class="block th-admin-select" 
          label="Type" 
          v-model="type"
        >
          <template v-for="option in typeOptions">
            <vs-option :label="option.name" :value="option.id" :key="option.id">{{option.name}}</vs-option>
          </template>
        </vs-select>
      </vs-col>
      <vs-col class="u-padding-20" vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <vs-select 
          class="block th-admin-select" 
          label="Classification" 
          v-model="classifications"
          multiple
        >
          <template v-for="option in classificationsOptions">
            <vs-option :label="option.name" :value="option.id" :key="option.id">{{option.name}}</vs-option>
          </template>
        </vs-select>
      </vs-col>
    </vs-row>

    <cemetery-options 
      class="u-padding-20"
      v-model="options"
    />

    <div class="u-flex is-justify-center u-padding-20">
      <vs-button @click="update">
        Update Cemetery
      </vs-button>
    </div>
  </div>
</template>

<script>
import { CemeteriesApi } from '@/api';

import CemeteryOptions from '@/components/admin/cemeteries/CemeteryOptions.vue';

export default {
  data: () => ({
    name: 'Cemetery 1',
    type: 1,
    classifications: [1,2],
    coordinates: ["json"],
    options : [
      {option_id: 1, commission: 20},
      {option_id: 2, commission: 0},
    ],
    media: [1,2],

    typeOptions: [ 
      { id: 1, name: "Cemetery Type 1"},
      { id: 2, name: "Cemetery Type 2"},
      { id: 3, name: "Cemetery Type 3"},
    ],
    classificationsOptions: [
      { id: 1, name: "classification 1"},
      { id: 2, name: "classification 2"},
      { id: 3, name: "classification 3"},
      { id: 4, name: "classification 4"},
      { id: 5, name: "classification 5"},
    ],

  }),
  computed: {
    id(){
      return this.$route.params.id;
    }
  },
  components: {
    CemeteryOptions,
  },
  methods: {
    getCemetery(){
      CemeteriesApi.get(this.id)
      .then(data => {
        let post = data.data;

        this.name = post.name;
        this.type = post.type;
        //coordinates, media
        this.classifications = post.classifications.map(el => el.id);
        this.options = post.options.map(el => ({
          option_id: el.id,
          commission: 200,
        }));
        
      });
    },
    update(){
      const postData = {
        name: this.name,
        type: this.type,
        classifications: this.classifications,
        coordinates: this.coordinates,
        options: this.options,
        media: this.media,
      };
      CemeteriesApi.update(this.id, JSON.stringify(postData));
    }
  },
  mounted(){
    this.getCemetery();
  }

}
</script>

<style>

</style>