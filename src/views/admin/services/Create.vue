<template>
  <div class="u-flex is-align-center is-justify-center is-direction-column content-admin">
    <h1>Create a service</h1>

    <vs-input class="input block" v-model="name" label="Service name" />

    <vs-select class="input block" label="Entity" v-model="entity">
      <template v-for="(option, key) in entity_options">
        <vs-option :label="option" :value="key" :key="Math.UUID()">{{option}}</vs-option>
      </template>
    </vs-select>

    <vs-select class="input block" label="Input type" v-model="inputTypeId">
      <template v-for="(option, key) in type_options">
        <vs-option :label="option" :value="key" :key="Math.UUID()">{{option}}</vs-option>
      </template>
    </vs-select>

    <h2>Service options</h2>
    <service-options v-model="options"></service-options>

    <vs-button @click="create">Create service</vs-button>
  </div>
</template>

<script>
import ServiceOptions from '@/components/admin/services/ServiceOptions';
import { ServicesApi } from '@/api';

export default {
  components: {
    ServiceOptions,
  },
  data: () => ({
    name: "",
    entity: 0,
    inputTypeId: 0,
    options: [
      { id: 123, name: "Test name" },
      { id: 122, name: "Test name fasd" },
      { id: 121, name: "Test name f adsf" }
    ],

    entity_options: ["Cemetery", "Crematory", "Funneral home", "Laboratory"],

    type_options: ["checkbox", "radio", "select"]
  }),
  methods: {
    create(){
      const requestData = {
        services : [
          {
            name: this.name,
            intity_id: this.entity,
            input_type_id: this.inputTypeId,
            // options: this.
          }
        ]
      };
      // ServicesApi.create();
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  margin: 20px;
  width: 400px;
}
.content-inputs {
  width: 400px;
}
</style>