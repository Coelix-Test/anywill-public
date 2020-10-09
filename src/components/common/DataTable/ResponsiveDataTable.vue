<template>
  <div class="c-responsive-data-table">
    <v-card ref="lazyTable" class="elevation-0 transparent">
      <v-card-title>
        <v-text-field
          :value="search"
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
        class=""
        mobile-breakpoint="1"
        hide-default-footer
        disable-sort
        show-expand
        show-select
        dense
        disable-pagination
        
      >
    
        <template
          v-for="column in displayColumns"
          v-slot:[`item.`+column.value]="{ item }"
        >
          <slot :name="'item.'+column.value" v-bind="{ item }" >{{item[column.value]}}</slot>
        </template>

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
    <!-- <v-pagination
      v-model="page"
      :length="paginationLength"
      :total-visible="7"
      class="mt-5"
      @input="handleChangePage"
    /> -->
  </div>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    displayColumns: [],
    hideColumns: [],
  }),
  computed: {
    
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    maxPages: {
      type: Number,
      default: 1
    },
    columns: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean,
      default: false,
    },
    search: {
      type: String,
      default: '',
    },
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
      this.$emit('update:seach', search);
      this.$emit('search', search);
    },
    handleOverScroll(){
      this.$emit('overscroll');
    },
    isScrolledToBottom(){
      const tableEl = this.$refs.lazyTable.$el;
      const BottomOfTablePosition = tableEl.offsetTop + tableEl.offsetHeight;
      const BottomWindowPixelPosition = document.documentElement.scrollTop + window.innerHeight;
      let scrolledToBottomOfTable = BottomOfTablePosition <= BottomWindowPixelPosition;
      return scrolledToBottomOfTable;
    },
    onScroll(){
      if(this.isScrolledToBottom()){
        //trigger next page load
        this.debouncedOverScroll();
      }
    },
    addScrollEvent(){
      window.addEventListener('scroll', this.onScroll);
    },
  },
  watch: {
    loading(){
      //Loading passed and
      if(!this.loading && this.isScrolledToBottom()){
        this.handleOverScroll();
      }
    }
  },
  created() {
    this.debouncedSearch = _.debounce(this.handleSearch, 500);
    this.debouncedOverScroll = _.debounce(this.handleOverScroll, 100);
  },
  mounted(){
    window.addEventListener('resize', this.resize);
    this.resize();
    this.addScrollEvent();
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('scroll', this.onScroll);
  }
}
</script>

<style lang="scss" scoped>
.expand-list{
  list-style-type: none;
}
.c-responsive-data-table::v-deep {
  tr.v-data-table__expanded{
    box-shadow: none;
  }
  .v-data-table{
    background: transparent;
    border: thin solid rgba(0, 0, 0, 0.12);
  }
}
  
</style>