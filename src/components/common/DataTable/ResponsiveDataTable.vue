<template>
  <vs-table
    :sst="true"
    :data="data"
    @search="handleSearch"
    @change-page="handleChangePage"
    search
    pagination
    :paginationMax="7"
    max-items="15"
    :total="totalItems"
    class="c-responsive-data-table"
  >
   
    <template slot="thead">
      <vs-th
        :key="index"
        v-for="(colName, index) in displayColumns"
      >
        {{ columns[colName].label }}
      </vs-th>
    </template>
    <template slot-scope="{data}">
      <data-table-row
        v-for="dataItem in data"
        :key="dataItem.id"
        :data="dataItem"
      >
        
        <vs-td 
        v-for="(colName, colIndex) in displayColumns"
        :key="colIndex"
        >
          {{ dataItem[colName] }}
        </vs-td>
        <template slot="expand">
          <div class="u-w-100">
            <vs-list v-if="hideColumns.length">
              <vs-list-item 
                v-for="(colName, colIndex) in hideColumns"
                :key="colIndex"
                :title="columns[colName].label"
                :subtitle="dataItem[colName]"
              />
            </vs-list>
            <slot name="expand" v-bind="dataItem"></slot>
          </div>
        </template>
      </data-table-row>
    </template>
  </vs-table>
</template>

<script>
import DataTable from '@/components/common/DataTable/DataTable.vue';
import DataTableRow from '@/components/common/DataTable/DataTableRow.vue';

export default {
  components: {
    DataTable,
    DataTableRow
  },
  data: () => ({
    displayColumns: [],
    hideColumns: [],
  }),
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
      type: Object,
      default: {}
    }
  },
  methods: {
    resize(){
      //console.log(document.documentElement.clientWidth);
      this.displayColumns.splice(0); 
      this.hideColumns.splice(0);

      for(const colName in this.columns){
        if (this.columns[colName].breakpoint && window.matchMedia("(max-width: "+this.columns[colName].breakpoint+"px)").matches) {
          this.hideColumns.push(colName);
        }
        else{
          this.displayColumns.push(colName);
        }
      }
    },
    handleSearch(search){
      this.$emit('search', search);
    },
    handleChangePage(page){
      this.$emit('change-page', page);
    },
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
.c-responsive-data-table::v-deep{
  .vs-table--pagination{
    justify-content: center;
  }
  .vs-pagination--mb{
    width: auto !important;
  }
  .vs-table--header{
    padding: 7px;
  }
}
</style>