<template>
  <div class="image-gallery">
    <div class="upload-zone">
      <span>Drop files here or </span>
      <label>
        <vs-button>Select from file system</vs-button>
        <!-- <input type="file"> -->
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    dragAndDropCapable: false,

  }),
  props: {
    
  },
  methods: {
    determineDragAndDropCapable(){
      var div = document.createElement('div');
      return ( ( 'draggable' in div )
              || ( 'ondragstart' in div && 'ondrop' in div ) )
              && 'FormData' in window
              && 'FileReader' in window;
    },
    selectFile(){},
  },
  mounted(){
    this.dragAndDropCapable = this.determineDragAndDropCapable();
  }
}
</script>

<style lang="scss">
.image-gallery{
  width: 100%;
}
.upload-zone{
  background-color: #eef2f5;
  height: 200px;
  width: 100%;
  outline: 2px dashed #92b0b3;
  outline-offset: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>