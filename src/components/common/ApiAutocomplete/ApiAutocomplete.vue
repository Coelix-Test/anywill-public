<template>
  <v-autocomplete
    class="api-autocomplete"
    :value="value"
    @input="onSelect"
    :loading="isLoading"
    :items="items"
    :label="label"
    :search-input.sync="search"
    item-text="name"
    :item-value="itemValue"
    :multiple="multiple"
    :chips="multiple"
    :deletable-chips="multiple"
  >
  </v-autocomplete>
</template>

<script>
import { ManagersApi, UsersApi, OrganizationsApi } from '@/api';

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
    },
    label: {
      type: String,
      default: '',
    },
    apiType: {
      type: String,
      default: 'managers'
    }
  },
  computed: {
    itemValue(){
      if(this.apiType === 'organizations'){
        return 'private_id';
      }
      else{
        return 'id';
      }
    }
  },
  methods: {
    getItems(){
      this.isLoading = true;
      let params = {
        page: this.page,
        per_page: this.perPage,
        search: this.search,
      }
      return this.getApi().getPage(params).then(response => {
        if(Array.isArray(response.data)){
          //if not paginated results
          this.items = response.data;
        }
        else{
          this.items = response.data.data;
        }
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
    getApi(){
      let api;
      switch(this.apiType){
        case 'managers':
          api = ManagersApi;
          break;
        case 'users':
          api = UsersApi;
          break;
        case 'organizations': 
          api = OrganizationsApi;
          break;
        default: 
          api = ManagersApi;
      }
      return api;
    }
  },
  watch: {
    search(){
      // console.log('search updated:', this.search);
      this.debouncedSearch();
    },
    apiType(){
      // console.log('ApiAutocomplete, api type updated:');
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

<style lang="scss" scoped>
.api-autocomplete::v-deep .v-chip--select{
  background: #161568 !important;
  color: #fff;
  .mdi-close-circle{
    color: #fff;
  }
}
</style>