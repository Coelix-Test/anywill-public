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
import { UsersApi } from '@/api';
import SingleUser from '@/mixins/user/single-user.mixin';

export default {
  mixins: [ SingleUser ],
  methods: {
    createSingle(){
      
      let postData = this.collectPostData();
      UsersApi.create(postData).then(response => {
        // console.log(response.data);
        if(response.data.id){
          this.$router.push('users-edit', { id: response.data.id});
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