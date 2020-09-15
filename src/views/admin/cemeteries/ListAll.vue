<template>
  <div>
    <h2 class="u-margin-20">All cemeteries</h2>
    <responsive-data-table
      :data="data"
      :columns="columns"
      :totalItems="totalItems"
      @update="getPage"
    >
    </responsive-data-table>
  </div>
</template>

<script>
import { CemeteriesApi } from '@/api';
import ResponsiveDataTable from '@/components/common/DataTable/ResponsiveDataTable.vue';


export default {
  components: {
    ResponsiveDataTable,
  },
  data: () => ({
    data: [],
    totalItems: 0,
    columns: [
      {
        value: 'name',
        text: 'Name',
        breakpoint: false,
        align: 'start',
      },
      {
        value: 'phone',
        text: 'Phone',
        breakpoint: 568
      },
      {
        value: 'address',
        text: 'Address',
        breakpoint: 1024
      },
    ],
  }),
  computed: {
    
  },
  methods: {
    getPage({ page, search }){
      console.log('page:', page, ' search:', search);
      CemeteriesApi.getPage({
        page: page,
        search: search
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
          this.$set(this.data, index, item);
        });
        this.totalItems = data.data.total;

      });
    },
    handleSearch(search){
      this.search = search;
      this.page = 1;
      this.getPage();
    },
    handleChangePage(page){
      this.page = page;
      this.getPage();
    },
    deleteItem(id){
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
    this.getPage({ page: 1, search: ''});
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