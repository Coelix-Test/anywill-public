<template>
  <div class="service-options-list">
    <vs-table class="table" >
      <template #thead>
        <vs-tr>
          <vs-th>Name</vs-th>
          <vs-th>Remove</vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="option.id" v-for="option in options" :data="option">
          <vs-td>
            <vs-input
              placeholder="Service name"
              :value="option.name"
              @input="changeProp(option.id, 'name', $event)"
            />
          </vs-td>
          <vs-td>
            <vs-button  @click="remove(tr.id)">
              Remove
            </vs-button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <div class="u-margin-20 u-flex is-justify-center">
      <vs-button 
        @click="add"
      >
        Add new service option
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    editActive: false,
    edit: null,
    editProp: null,
    editPropValue: null,
  }),
  model: {
    prop: "options",
    event: 'change',
  },
  props: {
    options: Array
  },
  methods: {
    add(){
      const resOptions = this.options.filter(() => true);
      resOptions.push({
        id: Math.UUID(),
        name: '',
      });
      this.$emit('change', resOptions);
    },
    remove(id){
      const resOptions = this.options.filter((item) => item.id !== id);
      this.$emit('change', resOptions);
    },
    changeProp(id, propKey, value){
      const resOptions = this.options.map( item => {
        if(item.id === id){
          item[propKey] = value;
        }
        return item;
      });
      this.$emit('change', resOptions);
    }
  }
};
</script>

<style lang="scss" scoped>
.service-options-list{
  width: 100%;
}
.table{
  width: 100%;
}
</style>