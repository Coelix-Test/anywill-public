<template>
  <div>
    <div class="d-flex align-center">
      <v-btn
        class=""
        @click="updateSingle" 
        dark
        color="primary"
        large
      >
        Save Changes
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