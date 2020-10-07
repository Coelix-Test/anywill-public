<template>
  <v-app id="content">
    <sidebar/>
    <navigation />
    <transition
      name="cool"
      mode="out-in"
    >
      <v-main 
        id="content"
        class="is-admin"
      >
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>
    </transition>
  </v-app>
</template>

<script>
import Navigation from '@/components/common/Navigation';
import Sidebar from '@/components/common/Sidebar';

export default {
  components: {
    Navigation,
    Sidebar,
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins';

@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;900&display=swap");
.v-application {
  font-family: 'Montserrat', sans-serif !important;
  .title { 
     font-family: 'Montserrat', sans-serif !important;
  }
}

#content {
  &.is-admin{
    background-color: #FCFCFC;
  }
  @include media('<=tablet'){
    padding: 1rem;
  }
  &.cool-enter {
    transform: scale(1.2) translateY(50px);
    opacity: 0;
  }
  &.cool-enter-to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }

  &.cool-leave-to {
    opacity: 0;
  }
  &.cool-leave {
    opacity: 1;
  }

  &.cool-leave-active {
    transform-origin: 50% 0;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
  &.cool-enter-active {
    transition: transform 0.5s ease, opacity 0.5s ease;
  }
}
</style>