<template>
  <div id="wrapper">
    <transition
      name="cool"
      mode="out-in"
    >
      <router-view 
        id="content" 
      />
    </transition>
  </div>
</template>

<script>

export default {
  
}
</script>

<style lang="scss" scoped>
#content {
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
