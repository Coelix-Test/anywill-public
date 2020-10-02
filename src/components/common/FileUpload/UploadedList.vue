<template>
  <v-data-table
    :headers="headers"
    :items="files"
    v-if="files.length"
    hide-default-footer
    class="c-uploaded-list"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <div class="d-flex">
        <v-icon
          @click="download(item)"
        >
          mdi-download
        </v-icon>
        <v-icon
          @click="deleteFile(item.id)"
        >
          mdi-delete
        </v-icon>
      </div>
    </template>
    <template v-slot:[`item.name`]="{ item }">
      <v-icon>mdi-file</v-icon>
      {{item.name}}
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data: () => ({
    headers: [
      { text: 'Name', value: 'name', sortable: false,},
      { text: '', value: 'actions', sortable: false, width: '1%' }
    ]
  }),
  computed: {
    // ...mapState({
    //   files: 'Files/getData',
    // })
    files(){
      return this.$store.getters['Files/getData'];
    }
  },
  methods: {
    ...mapMutations({
      deleteFile: 'Files/deleteFile'
    }),
    download(){

    }
  }
}
</script>

<style lang="scss" scoped>
.c-uploaded-list::v-deep table{
  border: thin solid rgba(0, 0, 0, 0.12);
}
</style>