<template>
  <vs-sidebar
    class="c-admin-sidebar"
    :value="isActive"
    @input="sidebarToggle"
    :hidden-background="!isMobile"
    :default-index="currentRouteName"
    parent="body"
    color="white"
  >
    <div class="u-flex is-justify-center" slot="header">
      <img src="@/assets/logo.png" alt="" width="32px">
    </div>

    <vs-sidebar-item 
      :to="{ name: 'cemeteries-all' }" 
      index="cemeteries-all"
      icon="location_city"
    >
      Cemeteries
    </vs-sidebar-item>
    <vs-sidebar-item 
      :to="{ name: 'services-create' }"
      index="services-create"
      icon="list"
    >
      Services
    </vs-sidebar-item>
    <vs-sidebar-item 
      :to="{ name: 'funeral-homes-create' }" 
      index="funeral-homes-create"
      icon="location_city"
    >
      Funeral Homes
    </vs-sidebar-item>
  </vs-sidebar>
</template>

<script>
export default {
  data: () => ({
    active: true,
  }),
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    isActive(){
      const isActive = this.$store.getters['Sidebar/isActive'];
      return ( !this.isMobile || isActive );
    },
    isMobile(){
      return this.$store.getters['WindowWidth/getWidth'] <= 1024;
    }
  },
  methods: {
    sidebarToggle(){
      this.$store.commit('Sidebar/toggle');
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/styles/vars';

.c-admin-sidebar::v-deep{
  .vs-sidebar{
    background: rgb(var(--vs-dark));
  }
  .vs-sidebar--item a,
  .vs-sidebar-item-active a{
    color: #fff;
  }
  .vs-sidebar-item-active{
    border-right: 3px solid #fff;
  }
}
</style>