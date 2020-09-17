<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          @input="debouncedSearch"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="displayColumns"
        :items="data"
        item-key="id"
        :items-per-page="15"
        class=""
        mobile-breakpoint="1"
        hide-default-footer
        disable-sort
        show-expand
        dense
      >
        <template 
          v-slot:expanded-item="{ headers, item }"
        >
          
          <td :colspan="headers.length">
            <ul class="pa-2 expand-list" v-if="hideColumns.length">
              <li 
                v-for="column in hideColumns"
                :key="column.value"
              >
                <strong>{{column.text}} : </strong>           
                {{ item[column.value] }}
              </li>
            </ul>
            <slot name="expand" :item="item"></slot>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-pagination
      v-model="page"
      :length="paginationLength"
      :total-visible="7"
      class="mt-5"
      @input="handleChangePage"
    />
  </div>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    search: '',
    page: 1,
    displayColumns: [],
    hideColumns: [],
  }),
  computed: {
    paginationLength(){
      return Math.ceil(this.totalItems / 15);
    },
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    totalItems: {
      type: Number,
      default: 0
    },
    columns: {
      type: Array,
      default: []
    }
  },
  methods: {
    resize(){
      // console.log(document.documentElement.clientWidth);
      this.displayColumns.splice(0); 
      this.hideColumns.splice(0);

      this.columns.forEach(column => {
        if (column.breakpoint && window.matchMedia("(max-width: "+column.breakpoint+"px)").matches) {
          this.hideColumns.push(column);
        }
        else{
          this.displayColumns.push(column);
        }
      });
    },
    handleSearch(search){
      this.$emit('search', search);
      this.$emit('update', {
        page: this.page,
        search: this.search
      });
    },
    handleChangePage(page){
      this.$emit('change-page', page);
      this.$emit('update', {
        page: this.page,
        search: this.search
      });
    },
  },
  created() {
    this.debouncedSearch = _.debounce(this.handleSearch, 500);
  },
  mounted(){
    window.addEventListener('resize', this.resize);
    this.resize();
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.resize);
  }
}
</script>

<style lang="scss" scoped>
.expand-list{
  list-style-type: none;
}
</style>