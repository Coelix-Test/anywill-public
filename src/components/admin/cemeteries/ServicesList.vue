<template>
  <div>
    <div 
      class="d-flex" 
      v-for="service in services" 
      :key="service"
    >
      
    </div>
    <v-btn
      block
      color="primary"
    >
      <span class="font-weight-bold">Add service</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    services: 9
  })
}
</script>

<style>

</style>