<template>
  <v-container 
      class="px-0"
    >
    <v-row>
      <v-col 
        cols="6"
        class="py-0"
      >
        <v-text-field
          label="Name"
          :value="user.name"
          @change="saveData('name', $event)"
        ></v-text-field>
      </v-col>
      <v-col 
        cols="6"
        class="py-0"
      >
        <v-text-field
          label="Username"
          :value="user.username"
          @change="saveData('username', $event)"
        ></v-text-field>
      </v-col>
      <v-col 
        cols="6"
        class="py-0"
      >
        <v-text-field
          label="Email"
          :value="user.email"
          @change="saveData('email', $event)"
        ></v-text-field>
      </v-col>
      <v-col 
        cols="6"
        class="py-0"
      >
        <v-select
          :value="user.role"
          :items="roleOptions"
          item-value="id"
          item-text="name"
          @change="saveData('role', $event)"
        ></v-select>
      </v-col>
      <v-col 
        cols="6"
        class="py-0"
      >
        <v-text-field
          label="Password"
          :value="user.password"
          @change="saveData('password', $event)"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          :rules="[rules.min]"
          
        ></v-text-field>
      </v-col>
      <v-col 
        cols="6"
        class="py-0"
      >
        <v-text-field
          label="Confirm password"
          :value="user.passwordConfirmation"
          @change="saveData('passwordConfirmation', $event)"
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
          :rules="[rules.min]"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { UsersApi } from '@/api';

export default {
  data: () => ({

    show1: false,
    show2: false,

    roleOptions: [],

    rules: {
      required: v => !!v || 'Required.',
      min: v => v.length >= 6 || 'Min 6 characters',
      passwordsMatch: v => {
        return this.password === this.passwordConfirmation || 'Passwords do not match.'
      } 
    }
  }),
  computed: {
    ...mapGetters({
      user: 'UserGeneral/data',
    })
  },
  methods: {
    saveData(prop, value){
      let user = this.user;
      user[prop] = value;
      this.$store.commit('UserGeneral/saveData', user);
    },
    getAvailableRoles(){
      UsersApi.getRoles().then(response => this.roleOptions = response.data);
    }
  },
  mounted(){
    this.getAvailableRoles();
  }
}
</script>

<style>

</style>