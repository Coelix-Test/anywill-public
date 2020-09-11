<template>
  <router-view id="wrapper"></router-view>
</template>

<script>

export default {
  methods: {
    setWindowWidth(){
      this.$store.commit('WindowWidth/setWindowWidth');
    }
  },
  created(){
    console.log('Main component created');
    window.addEventListener(
      'resize',
      this.setWindowWidth
    );
  }
}
</script>

<style lang="scss" scoped>

</style>
