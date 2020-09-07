<template>
  <vs-sidebar 
    open 
    square 
    class="c-sidebar"
    background="dark"
    textWhite
  >
    <template #logo>
      <img src="@/assets/logo.png" alt="" width="32px">
    </template>
    <vs-sidebar-group>
      <template #header>
        <vs-sidebar-item arrow>
          <template #icon>
            <i class='bx bx-church'></i>
          </template>
          Cemetery
        </vs-sidebar-item>
      </template>

      <vs-sidebar-item :to="{ name: 'cemeteries-all' }">
        All
      </vs-sidebar-item>
      <vs-sidebar-item :to="{ name: 'cemeteries-create' }">
        Create
      </vs-sidebar-item>
    </vs-sidebar-group>

    <vs-sidebar-group>
      <template #header>
        <vs-sidebar-item arrow>
          <template #icon>
            <i class='bx bx-collection'></i>
          </template>
          Services
        </vs-sidebar-item>
      </template>

      <vs-sidebar-item :to="{ name: 'services-create' }">
        Create
      </vs-sidebar-item>
    </vs-sidebar-group>

    <vs-sidebar-group>
      <template #header>
        <vs-sidebar-item arrow>
          <template #icon>
            <i class='bx bx-church'></i>
          </template>
          Funeral home
        </vs-sidebar-item>
      </template>

      <vs-sidebar-item :to="{ name: 'funeral-homes-create' }">
        Create
      </vs-sidebar-item>
    </vs-sidebar-group>
  </vs-sidebar>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>