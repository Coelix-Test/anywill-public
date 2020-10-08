<template>
  <div>
    <h2 class="u-margin-20">All Transactions</h2>
    <responsive-data-table
      :data="data"
      :search.sync="search"
      :columns="columns"
      :loading="loading"
      :maxPages="maxPages"
      @search="handleSearch"
      @overscroll="loadNextPage"
    >
      <template v-slot:item.amount="{ item }">
        <v-chip :color="getColor(item.amount)" dark>{{ item.amount }}</v-chip>
      </template>
      <template v-slot:expand="{ item }">
        <div>
          <v-btn 
            color="primary" 
            class="ma-2"
            :to="{name: 'transactions-edit', params: {id: item.id}}"
          >
            <v-icon left>mdi-pencil</v-icon>Edit
          </v-btn>
          <v-btn color="error" class="ma-2" @click="deleteItem(item.id)">
            <v-icon left>mdi-delete</v-icon>Delete
          </v-btn>
        </div>
      </template>
    </responsive-data-table>
    <v-fab-transition>
      <v-btn
        color="green"
        fab
        dark
        large
        fixed
        bottom
        right
        :to="{name: 'transactions-create'}"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { TransactionsApi } from '@/api';
import ResponsiveDataTable from '@/components/common/DataTable/ResponsiveDataTable.vue';


export default {
  components: {
    ResponsiveDataTable,
  },
  data: () => ({
    data: [],
    loading: false,
    page: 1,
    maxPages: 1,
    search: '',
    columns: [
      {
        value: 'amount',
        text: 'Amount',
        breakpoint: false,
        align: 'start',
      },
    ],
  }),
  computed: {
    
  },
  methods: {
    getPage({ page, search }){
      
      this.loading = true;
      TransactionsApi.getPage({
        page: page,
        search: search
      })
      .then(data => {

        this.totalItems = data.data.total;
        this.maxPages = data.data.last_page;

        data.data.forEach((item, index) => {
          
          item.id = item.private_id;
          delete item.private_id;
          this.data.push(item);
        });

        this.$nextTick(() => {
          this.loading = false;
        });

      });
    },
    deleteItem(id){
      TransactionsApi.delete(id)
      .then(response => {
        if(response.data === 1){
          this.data = this.data.filter(el => id !== el.id);
          this.totalItems--;
        }
      });
    },
    handleSearch(search){
      this.page = 1;
      //remove old items
      this.data.splice(0);
      this.getPage({
        page: this.page,
        search: search
      });
    },
    loadNextPage(){
      if(!this.loading && (this.page + 1 <= this.maxPages) ){
        this.page++;
        console.log('load page №', this.page);
        this.getPage({
          page: this.page,
          search: this.search,
        });
      }
    },
    getColor(amount){
      return amount > 0 ? 'red' : 'green';
    }
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