<template>
  <div>
    <h2 class="u-margin-20">All cemeteries</h2>
    <responsive-data-table
      :data="data"
      :totalItems="totalItems"
      :columns="columns"
      @change-page="handleChangePage"
      @search="handleSearch"
    >
      <template v-slot:expand="cemetery">
        <div class="u-flex actions">
          <vs-button
            color="danger"
            @click="deleteCemetery(cemetery.id)"
            icon="delete"
          >
          </vs-button>
          <vs-button 
            icon="edit"
            :to="{ name: 'cemetery-edit', params: { id: cemetery.id }}"
          />
        </div>
      </template>
    </responsive-data-table>
  </div>
</template>

<script>
import { CemeteriesApi } from '@/api';
import DataTable from '@/components/common/DataTable/DataTable.vue';
import ResponsiveDataTable from '@/components/common/DataTable/ResponsiveDataTable.vue';

export default {
  components: {
    DataTable,
    ResponsiveDataTable
  },
  data: () => ({
    search: '',
    data: [],
    totalItems: 0,
    page: 1,
    search: '',
    columns: {
      name: {
        // name: 'name',
        label: 'Name',
        breakpoint: false
      },
      phone: {
        // name: 'phone',
        label: 'Phone',
        breakpoint: 568
      },
      address: {
        // name: 'address',
        label: 'Address',
        breakpoint: 1024
      },
    },
    displayColumns: ['name', 'address', 'phone'],
    hideColumns: ['address', 'phone'],
  }),
  computed: {
    
  },
  methods: {
    getCemeteries(){
      CemeteriesApi.getPage({
        page: this.page,
        search: this.search
      })
      .then(data => {

        this.data.splice(0);
        data.data.data.forEach((item, index) => {
          item.address = 'Pushkinskaya 34, Odessa, Ukraine';
          item.phone = '+38(012)3456789';
          item.id = item.private_id;
          delete item.private_id;
          // this.cemeteries.push(item);
          // this.$set(this.data, index, item);
          this.$set(this.data, (this.page - 1) * 15 + index, item);
        });
        this.totalItems = data.data.total;

      });
    },
    handleSearch(search){
      this.search = search;
      this.page = 1;
      this.getCemeteries();
    },
    handleChangePage(page){
      this.page = page;
      this.getCemeteries();
    },
    deleteCemetery(id){
      CemeteriesApi.delete(id)
      .then(response => {
        if(response.data === 1){
          this.data = this.data.filter(el => id !== el.id);
          this.totalItems--;
        }
      });
    },
  },
  mounted(){
    this.getCemeteries(1);
  },
}
</script>

<style lang="scss" scoped>
.table-header{
  padding: 10px;
}
.crud-table::v-deep{
  .vs-table--header{
    padding: 10px;
  }
  .vs-table--search{
    max-width: 100%;
    margin-left: 0;
  }
}
.actions .vs-button{
  margin: 3px;
}
</style>