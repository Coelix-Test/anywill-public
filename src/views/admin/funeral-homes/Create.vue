<template>
  <div>
    <h1 class="u-margin-20">Create Funeral home</h1>
    <vs-input class="u-margin-20 block" v-model="name" label="Name" />
    <h2 class="u-margin-20">Gallery</h2>
    <image-gallery class="u-margin-20"></image-gallery>
    <h2 class="u-margin-20">Rooms</h2>
  
    
  </div>
</template>

<script>
import ImageGallery from '@/components/common/ImageGallery/ImageGallery.vue';

export default {
  data: () => ({

  }),
  components: {
    ImageGallery
  },

}
</script>

<style lang="scss">

</style>