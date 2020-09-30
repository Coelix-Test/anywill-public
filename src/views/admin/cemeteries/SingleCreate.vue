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
            v-model="user_id"
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
          <v-btn dark block @click="createSingle">Create</v-btn>
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
    name: '124 Conch St, Holden Beach, NC 28462, USA',
    type: 1,
    classifications: [1],
    options : [],
    media: [],
    address: '124 Conch St, Holden Beach, NC 28462, USA',
    addressComp: {},
    managers: [2,1],

    boundToOrganization: true,
    user_id: 0,
    organization: 2,
    

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

      CemeteriesApi.create(JSON.stringify(postData)).then(response => {
        if(response.data.private_id){
          this.$router.push({name: 'cemeteries-edit', params: { id: response.data.private_id} } );
        }
      });
      
    },
    getTypeOptions(){
      CemeteriesApi.getTypes().then(response => this.typeOptions = response.data);
    },
    getClassificationsOptions(){
      CemeteriesApi.getClassifications().then(response => this.classificationsOptions = response.data);
    },
  },
  mounted(){
    this.getTypeOptions();
    this.getClassificationsOptions();
  }
}
</script>

<style lang="scss" scoped>

</style>