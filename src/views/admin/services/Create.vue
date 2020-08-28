<template>
  <div class="u-flex is-align-center is-justify-center is-direction-column">
    <h1>Create a service</h1>

    
    <vs-input
      class="input block"
      v-model="name"
      label="Service name"
    />    

    <vs-select 
      class="input block"
      label="Entity" 
      v-model="entity"
    >
      <template v-for="(option, key) in entity_options">
        <vs-option :label="option" :value="key" :key="Math.UUID()">{{option}}</vs-option>
      </template>
    </vs-select>
  </div>
</template>

<script>
export default {
  data:() => ({
    name: '',
    entity: 0,
    inputTypeId: 0,
    options: [],

    entity_options: [
      'Cemetery', 'Crematory', 'Funneral home', 'Laboratory'
    ],

    type_options: [
      'checkbox', 'radio', 'select'
    ],
  }),

}
</script>

<style lang="scss" scoped>
.input{
  margin: 20px;
  width: 400px;
}
.content-inputs{
  width: 400px;
}
</style>