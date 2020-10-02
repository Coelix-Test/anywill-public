<template>
  <div>
    <address-autocomplete 
      :value="address.addressComponents"
      :address="address.formattedAddress"
      @update="onAddressComponentsUpdate"
      @update:address="onFormattedAddressUpdate"
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
      updateFormattedAddr: 'MapAddress/updateFormattedAddr',
    }),
    onAddressComponentsUpdate(addressComponents){
      this.updateAddrComp(addressComponents);
    },
    onFormattedAddressUpdate(formattedAddress){
      
      this.updateFormattedAddr(formattedAddress);
    }
  }
}
</script>

<style>

</style>