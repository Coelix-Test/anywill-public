<template>
  <div class="pa-4">
    <div class="text-h4">User Permissions</div>
    <div class="mt-4">
      <v-switch
        v-for="permission in permissions"
        class="mt-0"
        :key="permission.id"
        :label="permission.name"
        :value="permission.active"
        @change="handlePermissionChange($event, permission.id)"
        dense
      ></v-switch>
    </div>
  </div>
</template>

<script>
import { PermissionsApi } from '@/api';
import {mapGetters } from 'vuex'


export default {
  computed: {
    ...mapGetters({
      permissions: 'Permissions/all',
    })
  },
  methods: {
    handlePermissionChange(event, id){
      if(id === 1){
        if(event){
          this.$store.commit('Permissions/turnOnAll');
        }
        else{
          this.$store.commit('Permissions/turnOffAll');
        }
      }
      else{
        this.$store.commit('Permissions/updateItem', {id: id, value: event});
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