<template>
  <div>
    <v-switch
      v-for="permission in permissions"
      class="mt-0"
      :key="permission.id"
      :label="permission.name"
      :input-value="permission.active"
      @change="onPermissionChange($event, permission.id)"
      dense
    ></v-switch>
  </div>
</template>

<script>
import { PermissionsApi } from '@/api';
import {mapGetters } from 'vuex'


export default {
  computed: {
    ...mapGetters({
      permissions: 'Permissions/all',
    }),
  },
  methods: {
    onPermissionChange(value, id){
      if(id === 1){
        if(value){
          this.$store.commit('Permissions/turnOnAll');
        }
        else{
          this.$store.commit('Permissions/turnOffAll');
        }
      }
      else{
        if(!value){
          this.$store.commit('Permissions/updateItem', {id: 1, value: false});
        }
        this.$store.commit('Permissions/updateItem', {id: id, value: value});
      }
    }
  },
  mounted(){
    if(!this.$store.getters['Permissions/isLoaded']){
      this.$store.dispatch('Permissions/loadAll');
    }
  }
}
</script>

<style>

</style>