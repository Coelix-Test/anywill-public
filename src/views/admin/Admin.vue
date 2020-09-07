<template>
  <div id="content">
    <!-- <navigation /> -->
    <sidebar/>
    <transition
      name="cool"
      mode="out-in"
    >
      <router-view 
        id="content"
        class="is-admin"
      />
    </transition>
  </div>
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
#wrapper{
  margin-left: 260px;
  width: calc(100% - 260px);
  min-height: 100%;
}
#content {
  padding-top: 45px;
  width: 900px;
  margin: 0 auto;
  padding: 4.5rem 2.5rem 2rem 2.5rem;
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