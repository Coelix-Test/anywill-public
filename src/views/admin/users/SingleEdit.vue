<template>
  <div>
    <h1 class="u-margin-20">Update Cemetery</h1>
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
        <v-col cols="12" md="4">
          <v-switch v-model="boundToOrganization" label="Is bound to organization"></v-switch>
        </v-col>
        <v-col cols="12" md="4">
          <api-autocomplete
            v-if="boundToOrganization" 
            v-model="organization"
            label="Select organization"
            api-type="organizations"
          ></api-autocomplete>
          <api-autocomplete
            v-else 
            v-model="userId"
            label="Select owner"
            api-type="users"
          ></api-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <api-autocomplete 
            v-model="managers"
            label="Select Managers"
            api-type="managers"
            multiple>
          </api-autocomplete>
        </v-col>
        <v-col cols="12">
          <address-autocomplete :address.sync="address" v-model="addressComp"></address-autocomplete>
        </v-col>
        <v-col cols="12" md="2" offset-md="5">
          <v-btn dark block @click="createSingle">Update</v-btn>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
// import VueGoogleAutocomplete from 'vue-google-autocomplete';
import { CemeteriesApi } from '@/api';

import AddressAutocomplete from '@/components/common/Address/AddressAutocomplete';
import ApiAutocomplete from '@/components/common/ApiAutocomplete/ApiAutocomplete';

export default {
  data: () => ({
    name: '',
    type: null,
    classifications: [],
    options : [],
    media: [],
    address: '',
    addressComp: {},
    managers: [],

    boundToOrganization: false,
    userId: 0,
    organization: 0,
    

    typeOptions: [],
    classificationsOptions: [],

  }),
  components: {
    AddressAutocomplete,
    ApiAutocomplete,
  },
  methods: {
    createSingle(){
      
      //set up all address data together
      let addressData = JSON.parse(JSON.stringify(this.addressComp));
      addressData.formatted_address = this.address;

      const postData = {
        name: this.name,
        type: this.type,
        classifications: this.classifications,
        address: addressData,
        options: this.options,
        media: this.media,
        managers: this.managers
      };

      if(this.boundToOrganization){
        postData.organization_id = this.organization;
      }
      else{
        postData.user_id = this.user_id;
      }

      console.log(JSON.stringify(postData));
      CemeteriesApi.create(JSON.stringify(postData));
      
    },
    getTypeOptions(){
      CemeteriesApi.getTypes().then(response => this.typeOptions = response.data);
    },
    getClassificationsOptions(){
      CemeteriesApi.getClassifications().then(response => this.classificationsOptions = response.data);
    },
    getSingle(){
      CemeteriesApi.getPage({
        page: 1,
        per_page: 100,
      }).then(response => {
        let current = response.data.data.find(item => item.private_id === this.$route.params.id);
        console.log(current);

        this.name = current.name;
        this.type = current.type;
        this.classifications = current.classifications.map(item => item.id);

        //calc address components
        // this.address = 

        this.media = current.media;
        
        //cemetery options

        this.managers = current.managers;
        if(current.owner_type = "App\Models\Organization"){
          this.boundToOrganization = true;
          this.organization = current.owner_id;
        }
        else{
          this.userId = this.owner_id;
        }



      });
      // CemeteriesApi.get(this.$route.params.id).then(response => {
      //   console.log(reponse.data);
      // });
    },
  },
  mounted(){
    this.getTypeOptions();
    this.getClassificationsOptions();
    this.getSingle();
  }
}
</script>

<style lang="scss" scoped>

</style>