<template>
  <v-navigation-drawer
    v-model="active"
    :temporary="isMobile"
    dark
    app
    disable-resize-watcher
    mobile-breakpoint="0"
  >
    <div class="u-flex is-justify-center ma-4">
      <img src="@/assets/logo.png" alt="" width="32px">
    </div>
    <v-list>
      <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
          :to="item.route"
        >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    active: null,
    items: [
      {
        icon: 'mdi-grave-stone',
        text: 'Cemeteries',
        route: { name: 'cemeteries-all' }
      },
      {
        icon: 'mdi-church',
        text: 'Funeral Homes',
        route: { name: 'funeral-homes-all' }
      },
      {
        icon: 'mdi-flask',
        text: 'Laboratories',
        route: { name: 'laboratories-all' }
      },
      {
        icon: 'mdi-buffer',
        text: 'Services',
        route: { name: 'services-all' }
      },
    ]
  }),
  computed: {
    isActive() {
      let isActive = this.$store.getters['Sidebar/isActive'];
      return ( !this.isMobile || isActive ); //always visible on desktop  
    },
    isMobile(){
      return this.$store.getters['WindowWidth/getWidth'] <= 1024;
    }
  },
  watch: {
    isActive(){
      this.active = this.isActive;
    }
  },
  methods: {
    sidebarToggle(){
      this.$store.commit('Sidebar/toggle');
    },
  },
  mounted(){
    this.active = this.isActive;
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