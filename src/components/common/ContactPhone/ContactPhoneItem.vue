<template>
  <v-container>
    <v-row align="center">
      <v-col cols="8" class="py-0">
        <v-text-field
          label="Phone"
          prepend-inner-icon="mdi-phone"
          :value="phone"
          @input="updatePhone"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="py-0">
        <v-select
          label="Platform"
          :items="platforms"
          :prepend-icon="platformIcon"
          item-text="name"
          item-value="value"
          :value="platform"
          @input="updatePlatform"
        ></v-select>
      </v-col>
      <v-col cols="2" class="py-0">
        <v-btn 
          error 
          color="error" 
          block
          @click="this.deleteItem"
        >
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    platforms: [
      {name: 'None', value: '' },
      {name: 'Telegram', value: 'Telegram', icon: 'mdi-telegram' },
      {name: 'Viber', value: 'Viber' },
      {name: 'Whatsapp', value: 'Whatsapp', icon: 'mdi-whatsapp' },
    ]
  }),
  props: {
    id: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    platform: {
      type: String,
      default: '',
    },
  },
  computed: {
    platformIcon(){
      let platform = this.platforms.find(item => item.name === this.platform);
      if(platform){
        return platform.icon;
      }
      else{
        return undefined;
      }
    }
  },
  methods: {
    deleteItem(){
      this.$store.commit('ContactPhones/deleteItem', this.id);
    },
    updatePhone(value){
      let item = {
        id: this.id,
        phone: value,
        platform: this.platform
      }
      this.$store.commit('ContactPhones/updateItem', item);
    },
    updatePlatform(value){
      let item = {
        id: this.id,
        phone: this.phone,
        platform: value
      }
      this.$store.commit('ContactPhones/updateItem', item);
    },
  }
}
</script>

<style>

</style>