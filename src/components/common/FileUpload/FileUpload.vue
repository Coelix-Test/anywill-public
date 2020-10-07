<template>
  <div>
    <upload-popup></upload-popup>
    <uploaded-list></uploaded-list>
  </div>
</template>

<script>
import UploadPopup from './UploadPopup';
import UploadedList from './UploadedList';

export default {
  data: () => ({
  }),
  computed: {
    
  },
  components: {
    UploadPopup,
    UploadedList,
  }
}
</script>

