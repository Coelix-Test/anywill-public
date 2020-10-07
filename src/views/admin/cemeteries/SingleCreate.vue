<!-- 
TODO:  
- Adding services
-->
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
            <span class="font-weight-bold">Create</span>
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
          
          <file-upload class="mb-4"></file-upload>

          <v-card>
            <v-toolbar dense dark class="primary">
              <v-toolbar-title >Comment</v-toolbar-title>
            </v-toolbar>
            <div class="px-3 pt-3">
              <v-textarea
                cols="6"
                label="Leave your comment"
                no-resize
                outlined
                v-model="comment"
              ></v-textarea>
            </div>
          </v-card>
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
import { CemeteriesApi } from '@/api';
import { SingleCemetery } from '@/mixins/cemetery/single-cemetery.mixin';



export default {
  mixins: [ SingleCemetery ],
  methods: {
    createSingle(){

      let postData = this.collectPostData();
      CemeteriesApi.create(postData).then(response => {
        if(response.data.private_id){
          this.$router.push({name: 'cemeteries-edit', params: { id: response.data.private_id} } );
        }
      });
      
    },
  },
}
</script>

<style lang="scss" scoped>

</style>