<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field
          label="Name"
          v-model="name"
          
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Username"
          v-model="username"
          
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Email"
          v-model="email"
          
        ></v-text-field>
      </v-col>
      <v-col cols="6"></v-col>
      <v-col cols="6" >
        <v-text-field
          label="Password"
          v-model="password"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          :rules="[rules.min, rules.passwordsMatch]"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Confirm password"
          v-model="passwordConfirmation"
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
          :rules="[rules.min, rules.passwordsMatch]"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',

    show1: false,
    show2: false,

    rules: {
      required: v => !!v || 'Required.',
      min: v => v.length >= 6 || 'Min 6 characters',
      passwordsMatch: v => {
        return this.password === this.passwordConfirmation || 'Passwords do not match.'
      } 
    }
  }),
}
</script>

<style>

</style>