<template>
  <div>
    <h1>New Service Creation</h1>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Name"
            v-model="name"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select 
            v-model="optionsInputType"
            :items="optionsInputTypes"
            label="Options input type"
            item-text="name"
            item-value="id"
            :loading="!entitiesOptions.length"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select 
            v-model="entities"
            :items="entitiesOptions"
            label="Parent organization/service"
            item-text="name"
            item-value="id"
            :loading="!entitiesOptions.length"
          ></v-select>
        </v-col>
        
        <v-col cols="6"></v-col>
      </v-row>
    </v-container>

    <pre>
      <!-- {{options}} -->
    </pre>

    <div class="text-h6">Options</div>
    <v-list>
      <template v-for="option in options">
        <v-list-group :key="option.id*2" active-class="grey darken-4 white--text">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="option.name"></v-list-item-title>
            </v-list-item-content>
          </template>

          <template v-slot:append-icon>mdi-pencil</template>

          <div class="pa-4 grey lighten-3" >
            <v-text-field
              label="Name"
            ></v-text-field>
            <v-textarea
              label="Description"
              no-resize
              :rows="2"
            ></v-textarea>

            <v-btn color="error" >Remove option</v-btn>
          </div>
          
        </v-list-group>
        <v-divider :key="option.id*2+1"></v-divider>
        
      </template>
    </v-list>
    <v-btn color="primary">Add option</v-btn>

    <div class="d-flex justify-center my-5">
      <v-btn color="green" dark large class="px-16">SAVE</v-btn>
    </div>
  </div>
</template>

<script>
import { EntitiesApi, ServicesApi } from '@/api';

export default {
  data: () => ({
    name: 'Funeral ceremony type',
    options: [
      {
        id: 0,
        name: 'Name',
        description: 'Plain text',
        hasSubOpt: true,
        options: [
          {
            id: 0,
            name: 'Name',
            description: 'Plain text',
          }
        ],
        services: [
          {
            id: 0,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          },
          {
            id: 1,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          },
          {
            id: 2,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          }
        ]
      },
      {
        id: 1,
        name: 'Name 1',
        description: 'Plain text',
        hasSubOpt: true,
        services: [
          {
            id: 0,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          },
          {
            id: 1,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          },
          {
            id: 2,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Name 2',
        description: 'Plain text',
        hasSubOpt: true,
        services: [
          {
            id: 0,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          },
          {
            id: 1,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          },
          {
            id: 2,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          }
        ]
      }
    ],
    optionsInputType: {},
    optionsInputTypes: [],
    serviceAutocomplete: '',
    entities: '',
    entitiesOptions: [],
  }),
  components: {
    
  },
  methods: {
    testmeth(event){
      event.stopPropagation();
    },
    getEntities(){
      EntitiesApi.getAll().then(response => this.entitiesOptions = response.data);
    },
    getOptionTypes(){
      ServicesApi.getOptionInputTypes().then(response => this.optionsInputTypes = response.data);
    }
  },
  mounted(){
    this.getEntities();
    this.getOptionTypes();
  }
}
</script>

<style>

</style>