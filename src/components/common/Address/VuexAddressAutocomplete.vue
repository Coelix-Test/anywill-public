<template>
  <div>
    <address-autocomplete 
      :value="address.addressComponents"
      @update="onAddressComponentsUpdate"
    ></address-autocomplete>
  </div>
</template>

<script>
import AddressAutocomplete from './AddressAutocomplete'

import { mapMutations, mapState } from 'vuex';
export default {
  computed: {
    address(){
      return this.$store.getters['MapAddress/getData'];
    },
  },
  components: {
    AddressAutocomplete,
  },
  methods: {
    ...mapMutations({
      updateAddrComp: 'MapAddress/updateAddrComp',
    }),
    onAddressComponentsUpdate(addressComponents){
      this.updateAddrComp(addressComponents);
    },
  }
}
</script>

<style>

</style>