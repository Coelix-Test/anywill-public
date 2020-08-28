<template>
  <div class="center examplex navigation">
      <vs-navbar color="dark" text-white square center-collapsed >
        <template #left>
          <img src="@/assets/logo.png" alt="" width="32px">
        </template>
        <vs-navbar-group>
            Services
            <template #items>
                <vs-navbar-item>
                    All
                </vs-navbar-item>
                <vs-navbar-item :to="{ name: 'services-create' }" active-class="active">
                    Create
                </vs-navbar-item>
            </template>
        </vs-navbar-group>
        <vs-navbar-item >
          test 1
        </vs-navbar-item>
        <vs-navbar-item  >
          test 2
        </vs-navbar-item>
        <vs-navbar-item >
          license
        </vs-navbar-item>
      </vs-navbar>
      
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>