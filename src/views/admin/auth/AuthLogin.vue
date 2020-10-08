<template>
  <div>
    <v-card class="elevation-3 pb-4">
      <v-card-title class="justify-center text-center">Login</v-card-title>
      <v-container>
        <v-row>
          <v-col cols="8" offset="2" class="py-0">
            <v-text-field
              label="Enter username or email"
              outlined
              v-model="username"
            >
            </v-text-field>
          </v-col>
          <v-col cols="8" offset="2" class="py-0">
            <v-text-field
              label="Enter your password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              :type="show1 ? 'text' : 'password'"
              outlined
              v-model="password"
            >
            </v-text-field>
          </v-col>
          <v-col cols="8" offset="2" class="py-0 d-flex flex-column align-center">
            <v-btn block color="primary" dark @click="login">Login</v-btn>
            <router-link :to="{ name: 'users-all' }" class="mt-4">Forgot password?</router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { UsersApi, AuthApi } from '@/api';

export default {
  data: () => ({
    username: 'admin',
    password: 'password',

    show1: false,
  }),
  methods: {
    login(){
      AuthApi.login({
        login: this.username,
        password: this.password,
      }).then(response => {
        console.log(response);
        this.$store.commit('CurrentUser/auth', response.data.access_token);
        // TODO: get user data
        this.$router.push({name: 'users-all'});
      });
    }
  }
}
</script>

<style>

</style>