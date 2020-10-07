<template>
  <div>
    <div class="d-flex align-center">
      <v-btn
        class=""
        @click="createSingle" 
        dark
        color="primary"
        large
      >
        Save
      </v-btn>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          
          <div class="text-h5">General Info</div>
          <user-general-info></user-general-info>
          
          <template v-if="showPermissions">
            <div class="text-h5 mb-3">User Permissions</div>
            <user-permissions ></user-permissions>
          </template>

          <div class="text-h5">Comment</div>
          <v-textarea
            cols="3"
            rows="3"
            label="Leave your comment"
            no-resize
            v-model="comment"
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-h5">Phones</div>
          <contact-phone-list></contact-phone-list>

          <div class="text-h5">Files</div>
          <file-upload></file-upload>

        </v-col>
        <v-col>
          <div class="text-h5">Address</div>
          <vuex-address-autocomplete></vuex-address-autocomplete>
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
          this.$router.push({ name: 'users-edit', params: { id: response.data.id} });
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