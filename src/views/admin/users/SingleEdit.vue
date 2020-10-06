<template>
  <div>
    <div class="d-flex align-center">
      <h1 class="ma-5">Edit User</h1>
      <v-spacer></v-spacer>
      <v-btn
        class="ma-5"
        @click="updateSingle" 
        dark
        large
      >
        Save Changes
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
import { UsersApi } from '@/api';
import SingleUser from '@/mixins/user/single-user.mixin';


export default {
  mixins: [ SingleUser ],
  methods: {
    updateSingle(){
      
      let postData = this.collectPostData();
      UsersApi.update(this.$route.params.id, postData).then(response => {
        
        // console.log(response);
      });
      
    },
    getSingle(){
      UsersApi.getSingle(this.$route.params.id).then(response => {
        console.log(response.data);

        this.$store.commit('UserGeneral/saveData', {
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
          password: '',
          passwordConfirmation: '',
        });

        //push permissions
        if( ( response.data.role === 3) && response.data.permissions.length){
          console.log('permissions loading');
          response.data.permissions.forEach(permission => {
            this.$store.commit('Permissions/updateItem', {
              id: permission.id,
              value: true,
            });
          });
        }

        if(response.data.contacts.length){
          response.data.contacts.forEach(item => {
            let contact = {
              id: item.id,
              platform: item.platform,
              phone: item.phone
            };
            this.$store.commit('ContactPhones/addItem', item);
          });
        }

        if(response.data.addresses.length){
          let addr = response.data.addresses[0];
          delete addr.addressable_id;
          delete addr.addressable_type;
          addr.latitude = parseFloat(addr.latitude);
          addr.longitude = parseFloat(addr.longitude);
          this.$store.commit('MapAddress/updateAddrComp', addr);
        }

        if(response.data.comments.length){
          this.comment = response.data.comments[0].comment;
        }

        if(response.data.media){
          response.data.media.forEach(item => {
            this.$store.commit('Files/addFile', item);
          });
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