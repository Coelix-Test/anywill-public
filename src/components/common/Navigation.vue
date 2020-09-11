<template>
  <vs-navbar 
    color="dark"
    text-color="#ffffff"
    class="header"
  >
      <div slot="title" >
        <vs-button 
          icon="menu" 
          class="sidebar-trigger"
          type="flat"
          color="#ffffff"
          @click="openSidebar"
        />
        
      </div>
      
    </vs-navbar>
</template>

<script>
export default {
  methods: {
    openSidebar(){
      this.$store.commit('Sidebar/toggle');
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