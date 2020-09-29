<template>
  <div class="pa-4">
    <div class="text-h4">User Permissions</div>
    <div class="mt-4">
      <v-switch
        class="mt-0"
        v-for="permission in permissions"
        :key="permission.id"
        :label="permission.name"
        dense
      ></v-switch>
    </div>
  </div>
</template>

<script>
import { PermissionsApi } from '@/api';

export default {
  data: () => ({
    permissions: [],
  }),
  methods: {
    getPermissions(){
      PermissionsApi.get().then(response => {
        if(response.data.length){
          this.permissions = response.data;
        }
      })
    }
  },
  mounted(){
    this.getPermissions();
  }
}
</script>

<style>

</style>