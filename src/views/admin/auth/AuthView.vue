<template>
  <v-app>
    <v-main class="indigo lighten-1 d-flex justify-center align-center">
      <v-container>
        <v-row>
          <v-col 
            cols="4"
            offset="4"
          >
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>