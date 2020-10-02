<!-- 
TODO:  
- Adding services
- Redirect to single edit
-->
<template>
  <div>
    <div class="d-flex align-center">
      <h1 class="ma-5">Create User</h1>
      <v-spacer></v-spacer>
      <v-btn
        class="ma-5"
        @click="createSingle" 
        dark
        large
      >
        Save
      </v-btn>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-tabs
              v-model="leftTabActive"
              background-color="dark"
              dark
            >
              <v-tab
                v-for="(tab,index) in leftTabs"
                :key="index"
                :href="`#tab-${index}`"
              >
                {{tab.name}}
              </v-tab>

              <v-tab-item
                v-for="(tab,index) in leftTabs"
                :key="index"
                :value="'tab-' + index"
              >
                <component :is="tab.component" class="pa-3"></component>
              </v-tab-item>
            </v-tabs>
            
          </v-card>

          <v-card class="my-2">
            <file-upload></file-upload>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card v-if="showPermissions">
            <v-toolbar dense dark>
              <v-toolbar-title >User Permissions</v-toolbar-title>
            </v-toolbar>
            <user-permissions class="pa-4 mb-2"></user-permissions>
          </v-card>

          <v-card>
            <v-toolbar dense dark>
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
        
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import VueGoogleAutocomplete from 'vue-google-autocomplete';
import { UsersApi } from '@/api';

import UserGeneralInfo from '@/components/admin/users/UserGeneralInfo';
import UserPermissions from '@/components/admin/users/UserPermissions';
import ContactPhoneList from '@/components/common/ContactPhone/ContactPhoneList';
import FileUpload from '@/components/common/FileUpload/FileUpload';
import VuexAddressAutocomplete from '@/components/common/Address/VuexAddressAutocomplete';

export default {
  data: () => ({
    name: '',
    leftTabActive: null,
    leftTabs: [
      { name: 'General Info', component: UserGeneralInfo,},
      { name: 'Contact Info', component: ContactPhoneList,},
      { name: 'Address', component: VuexAddressAutocomplete,},
    ],

    comment: '',
  }),
  components: {
    UserGeneralInfo,
    UserPermissions,
    ContactPhoneList,
    FileUpload,
    VuexAddressAutocomplete,
  },
  computed: {
    showPermissions(){
      return this.$store.getters['UserGeneral/data'].role === 3;
    }
  },
  methods: {
    createSingle(){
      
      let postData = this.collectPostData();
      UsersApi.create(postData).then(response => {
        // if(response.data.private_id){
          
        // }
        console.log(response);
      });
      
    },
    collectPostData(){
      
      let general = { ...this.$store.getters['UserGeneral/data'] };
      general.password_confirmation = general.passwordConfirmation;
      delete general.passwordConfirmation;
      
      const files = this.$store.getters['Files/getData'].map(e => e.id);
      const contacts = this.$store.getters['ContactPhones/data'].map(item => {
        return {phone: item.phone, platform: item.platform};
      });

      let addressVuex = this.$store.getters['MapAddress/getData'];
      let addressFormatted = { 
        ...addressVuex.addressComponents,
        formatted_address: addressVuex.formattedAddress
      }

      const postData = {
        ...general,
        contacts: contacts,
        comment: this.comment,
        media: files,
        addresses: [
          addressFormatted
        ],
      };

      if(this.showPermissions){
        let permissions = this.$store.getters['Permissions/allActive'];
        postData.permissions = permissions;
      }

      console.log(postData);
      return postData;

    },
  },
  mounted(){
    
  }
}
</script>

<style lang="scss" scoped>

</style>