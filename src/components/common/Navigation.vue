<template>
  <v-app-bar
      color="deep-dark"
      v-if="isMobile"
      dense
      dark
      app
    >
      <v-app-bar-nav-icon
        @click="toggleSidebar">
      </v-app-bar-nav-icon>
    </v-app-bar>
  
</template> 

<script>
export default {
  methods: {
    toggleSidebar(){
      this.$store.commit('Sidebar/toggle');
    }
  },
  computed: {
    isMobile(){
      return this.$store.getters['WindowWidth/getWidth'] <= 1024;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins';
.header.vs-navbar{
  display: none;
}
.header::v-deep{
  .vs-navbar--btn-responsive{
    display: none;
  }
}

@include media('<=desktop'){
  .header.vs-navbar{
    display: flex;
  }
}
</style>