<!-- 
TODO:  
- Adding services
- Redirect to single edit
-->
<template>
  <div>
    <h1 class="u-margin-20">Create Manager</h1>
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
          <v-card>
            <v-card-title>Permissions</v-card-title>
          </v-card>
        </v-col>
        
      </v-row>
    </v-container>

  </div>
</template>

<script>
// import VueGoogleAutocomplete from 'vue-google-autocomplete';
import { CemeteriesApi, ManagersApi } from '@/api';

import UserGeneralInfo from '@/components/admin/users/UserGeneralInfo';

export default {
  data: () => ({
    name: '',
    leftTabActive: null,
    leftTabs: [
      { name: 'General Info', component: UserGeneralInfo,},
      { name: 'Contact Info', component: UserGeneralInfo,},
    ],
  }),
  components: {
    UserGeneralInfo,
  },
  methods: {
    createSingle(){
      
      const postData = {
        name: this.name,
      };

      console.log(JSON.stringify(postData));
      ManagersApi.create(JSON.stringify(postData)).then(response => {
        if(response.data.private_id){
          
        }
      });
      
    },
  },
  mounted(){
    
  }
}
</script>

<style lang="scss" scoped>

</style>