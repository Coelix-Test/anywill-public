<template>
  
</template>

<script>
export default {
  data: () => ({
    
  }),
  model: {
    prop: "options",
    event: 'change',
  },
  props: {
    options: Array
  },
  methods: {
    getEntities(){
      EntitiesApi.getAll().then(response => this.entitiesOptions = response.data);
    },
    getOptionTypes(){
      ServicesApi.getOptionInputTypes().then(response => this.optionsInputTypes = response.data);
    }
  },
  mounted(){
    this.getEntities();
    this.getOptionTypes();
  }
};
</script>

<style lang="scss" scoped>

</style>