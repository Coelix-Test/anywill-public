<template>
  <div>
    <template v-for="item in items">
      <contact-phone-item 
      :key="item.id" 
      v-bind="item"
      >
      </contact-phone-item>
      <v-divider :key="item.id + '-'"></v-divider>
    </template>
    <v-btn 
    class="my-3" 
    dark
    color="primary"
    @click="addItem"
    large
    >
      <v-icon>mdi-plus</v-icon>
      Add phone number
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ContactPhoneItem from './ContactPhoneItem';

export default {
  components: {
    ContactPhoneItem,
  },
  computed: {
    ...mapGetters({
      items: 'ContactPhones/data',
    })
  },
  methods: {
    addItem(){
      this.$store.commit('ContactPhones/addItem');
    }
  },
}
</script>

<style>

</style>