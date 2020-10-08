<template>
  <v-navigation-drawer
    v-model="active"
    :temporary="isMobile"
    app
    disable-resize-watcher
    mobile-breakpoint="0"
    class="elevation-3 px-2"
  >
    <div class="u-flex is-justify-center ma-4">
      <img src="@/assets/anywill.svg" alt="">
    </div>
    <v-divider></v-divider>
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
    desktopState: true,
    mobileState: false,
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
      {
        icon: 'mdi-account',
        text: 'Users',
        route: { name: 'users-all' }
      },
      {
        icon: 'mdi-account',
        text: 'Organizations',
        route: { name: 'organizations-all' }
      },
      {
        icon: 'mdi-cash-multiple',
        text: 'Transactions',
        route: { name: 'transactions-all' }
      },
    ]
  }),
  computed: {
    isActive() {
      return this.$store.getters['Sidebar/isActive'];
    },
    isMobile(){
      return this.$store.getters['WindowWidth/getWidth'] <= 1024;
    }
  },
  watch: {
    isMobile(){
      // console.log('switched to ', this.isMobile ? 'mobile' : 'desktop', ' mode');
      if(this.isMobile){
        //switched to mobile mode
        this.sidebarHide();
      }
      else{
        //switched to desktop mode
        this.sidebarShow();
      }
    },
    isActive(){
      //sidebar state in vuex has changed
      this.active = this.isActive;
    },
    active(){
      if(this.isActive !== this.active){
        this.sidebarToggle();
      }
    }
  },
  methods: {
    sidebarToggle(){
      this.$store.commit('Sidebar/toggle');
    },
    sidebarHide(){
      this.$store.commit('Sidebar/hide');
    },
    sidebarShow(){
      this.$store.commit('Sidebar/show');
    },
  },
  mounted(){
    if(this.isMobile){
      this.sidebarHide();
    }
    else{
      this.sidebarToggle();
    }
    this.active = this.isMobile ? false : true;
  }
}
</script>

<style lang="scss" scoped>

@import '@/styles/vars';
</style>