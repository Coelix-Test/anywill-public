<template>
  <v-autocomplete
    :value="value"
    @input="onSelect"
    :loading="isLoading"
    :items="items"
    label="Select managers"
    :search-input.sync="search"
    item-text="name"
    item-value="id"
    :multiple="multiple"
    :chips="multiple"
    :deletable-chips="multiple"
  >
  </v-autocomplete>
</template>

<script>
import { ManagersApi } from '@/api';

export default {
  data: () => ({
    isLoading: true,
    items: [],
    perPage: 15000,
    page: 1,
    search: '',
  }),
  props: {
    value: {
      default: () => null,
    },
    multiple: {
      type: Boolean,
      default: false,
    }
  },
  computed: {

  },
  methods: {
    getItems(){
      this.isLoading = true;
      let params = {
        page: this.page,
        per_page: this.perPage,
        search: this.search,
      }
      return ManagersApi.getPage(params).then(response => {
        this.items = response.data;
        this.isLoading = false;
      });
    },
    handleSearch(arg){
      console.log('search updated: ', arg);
      this.getItems();
    },
    onSelect(value){
      this.$emit('input', value);
    },
  },
  watch: {
    search(){
      console.log('search updated:', this.search);
      this.debouncedSearch();
    }
  },
  mounted(){
    // this.getItems();
  },
  created(){
    this.debouncedSearch = _.debounce(this.handleSearch, 300);
  }
}
</script>

<style>

</style>