<template>
  <div>
    <v-expansion-panels v-model="open" dense>
      <v-expansion-panel>
        <v-expansion-panel-header class="primary white--text">
          Files
          <template v-slot:actions>
            <v-icon color="white">
              $expand
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            
            <upload-popup></upload-popup>
            <uploaded-list></uploaded-list>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    
  </div>
</template>

<script>
import UploadPopup from './UploadPopup';
import UploadedList from './UploadedList';

export default {
  data: () => ({
    open: null,
  }),
  computed: {
    
  },
  components: {
    UploadPopup,
    UploadedList,
  }
}
</script>

