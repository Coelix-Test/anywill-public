<template>
  <div>
    <v-expansion-panels v-model="open" dense>
      <v-expansion-panel>
        <v-expansion-panel-header :class="openClass">
          Files
          <template v-slot:actions>
            <v-icon :color="iconColor">
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
    openClass(){
      return this.open === 0 ? 'grey darken-4 white--text' : '';
    },
    iconColor(){
      return this.open === 0 ? 'white' : 'black';
    }
  },
  components: {
    UploadPopup,
    UploadedList,
  }
}
</script>

