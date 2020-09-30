<!-- 
TODO:  
- Adding services
- Redirect to single edit
-->
<template>
  <div>
    <h1 class="u-margin-20">Create User</h1>
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
                <component :is="tab.component"></component>
              </v-tab-item>
            </v-tabs>
            
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card v-if="showPermissions">
            <user-permissions></user-permissions>
          </v-card>
        </v-col>
        
      </v-row>
    </v-container>
    <div class="d-flex justify-center" >
      <v-btn
        
        @click="createSingle" dark>
        Save
      </v-btn>
    </div>
  </div>
</template>

<script>
// import VueGoogleAutocomplete from 'vue-google-autocomplete';
import { UsersApi } from '@/api';

import UserGeneralInfo from '@/components/admin/users/UserGeneralInfo';
import UserPermissions from '@/components/admin/users/UserPermissions';
import ContactPhoneList from '@/components/common/ContactPhone/ContactPhoneList';

export default {
  data: () => ({
    name: '',
    leftTabActive: null,
    leftTabs: [
      { name: 'General Info', component: UserGeneralInfo,},
      { name: 'Contact Info', component: ContactPhoneList,},
    ],
  }),
  components: {
    UserGeneralInfo,
    UserPermissions,
    ContactPhoneList,
  },
  computed: {
    showPermissions(){
      return this.$store.getters['UserGeneral/data'].role === 'manager';
    }
  },
  methods: {
    createSingle(){
      
      const postData = {};
      const general = this.$store.getters['UserGeneral/data'];
      const contacts = this.$store.getters['ContactPhones/data'];

      if(this.showPermissions){
        let permissions = this.$store.getters['Permissions/all'];
      }

      console.log(JSON.stringify(postData));
      // UsersApi.create(JSON.stringify(postData)).then(response => {
      //   if(response.data.private_id){
          
      //   }
      // });
      
    },
  },
  mounted(){
    
  }
}
</script>

<style lang="scss" scoped>

</style>