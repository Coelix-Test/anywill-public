<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn 
            color="primary" 
            @click="createSingle"
            large
          >
            <span class="font-weight-bold">Save changes</span>
          </v-btn>
        </v-col>
        <v-col cols="4">
          <p class="text-h5">General Info</p>
          <v-container class="px-0">
            <v-row no-gutters>
              <v-col cols=6 class="pr-3">
                <v-text-field
                  label="Name"
                  v-model="name"
                  class="mt-3"
                ></v-text-field>
              </v-col>
              <v-col cols=6 class="pl-3">
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
            </v-row>
          </v-container>

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

          <v-switch v-model="boundToOrganization" label="Is bound to organization"></v-switch>

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

          <api-autocomplete 
            v-model="managers"
            label="Select Managers"
            api-type="managers"
            multiple>
          </api-autocomplete>
          
        </v-col>

        
        <v-col cols="4" >
          <p class="text-h5">Services</p>
          <services-list></services-list>
        </v-col>
        <v-col cols="4" >
          <address-autocomplete :address.sync="address" v-model="addressComp"></address-autocomplete>
        </v-col>
        
      </v-row>
    </v-container>

  </div>
</template>

<script>
// import VueGoogleAutocomplete from 'vue-google-autocomplete';
import { CemeteriesApi } from '@/api';
import { SingleCemetery } from '@/mixins/cemetery/single-cemetery.mixin';

export default {
  mixins: [ SingleCemetery ],
  methods: {
    updateSingle(){
      const postData = this.collectPostData();
      CemeteriesApi.update(this.$route.params.id, postData);
    },
    getSingle(){
      CemeteriesApi.get(this.$route.params.id).then(response => {
        let current = response.data;
        // console.log(current);

        this.name = current.name;
        this.type = current.type;
        this.classifications = current.classifications.map(item => item.id);

        //calc address components
        this.address = current.address.formatted_address;
        delete current.address.formatted_address;
        current.address.latitude = parseFloat(current.address.latitude);
        current.address.longitude = parseFloat(current.address.longitude);
        this.addressComp = current.address;

        this.media = current.media;
        
        //TODO: cemetery options
        //

        this.managers = current.managers;
        if(current.owner_type === "App\Models\Organization"){
          this.boundToOrganization = true;
          this.organization = current.owner_id;
        }
        else{
          this.userId = this.owner_id;
        }

      });
    },
  },
  mounted(){
    this.getSingle();
  }
}
</script>

<style lang="scss" scoped>

</style>