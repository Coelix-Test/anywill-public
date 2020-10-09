<template>
  <div>
    <h2 class="u-margin-20">All users</h2>
    <responsive-data-table
      :data="data"
      :search.sync="search"
      :columns="columns"
      :loading="loading"
      :maxPages="maxPages"
      @search="handleSearch"
      @overscroll="loadNextPage"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex">
          <v-btn 
            icon
            :to="{name: 'users-edit', params: {id: item.id}}"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteItem(item.id)">
            <v-icon>mdi-delete</v-icon>
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
        :to="{name: 'users-create'}"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { UsersApi } from '@/api';
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
        value: 'name',
        text: 'Name',
        breakpoint: false,
        align: 'start',
      },
      {
        value: 'email',
        text: 'Email',
        breakpoint: 568
      },
      {
        value: 'username',
        text: 'Username',
        breakpoint: 1024
      },
      {
        value: 'actions',
        text: '',
        breakpoint: false,
        width: '1%',
        align: 'end',
      },
    ],
  }),
  computed: {
    
  },
  methods: {
    getPage({ page, search }){
      
      this.loading = true;
      UsersApi.getPage({
        page: page,
        search: search,
        per_page: 25,
      })
      .then(data => {

        this.totalItems = data.data.total;
        this.maxPages = data.data.last_page;

        data.data.data.forEach((item, index) => {
          this.data.push(item);
        });

        this.$nextTick(() => {
          this.loading = false;
        });

      });
    },
    deleteItem(id){
      UsersApi.delete(id)
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
        // console.log('load page №', this.page);
        this.getPage({
          page: this.page,
          search: this.search,
        });
      }
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