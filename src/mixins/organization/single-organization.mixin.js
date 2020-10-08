import AddressAutocomplete from '@/components/common/Address/AddressAutocomplete';
import VuexAddressAutocomplete from '@/components/common/Address/VuexAddressAutocomplete';
import ApiAutocomplete from '@/components/common/ApiAutocomplete/ApiAutocomplete';
import ServicesList from '@/components/admin/cemeteries/ServicesList';
import FileUpload from '@/components/common/FileUpload/FileUpload';

import { CemeteriesApi } from '@/api';

export const SingleOrganization = {
  data(){
    return {
      name: '124 Conch St, Holden Beach, NC 28462, USA',
      description: "",
      options : [],
      // media: [],
      address: '124 Conch St, Holden Beach, NC 28462, USA',
      addressComp: {},
      managers: [2,1],
      cemeteries: [],
      laboratories: [],
      cremations: [],
      funeral_homes: [],
      comment: '',
      boundToOrganization: true,
      user_id: 0,
      organization: 2,
    }
  },
  components: {
    AddressAutocomplete,
    ApiAutocomplete,
    ServicesList,
    FileUpload,
    VuexAddressAutocomplete,
  },
  methods: {
    collectPostData(){
      let addressData = { 
        ...this.addressComp,
        formatted_address: this.address
      };

      const files = this.$store.getters['Files/getData'].map(e => e.id);

      let postData = {
        name: this.name,
        type: this.type,
        classifications: this.classifications,
        options: this.options,
        description: this.description,
        media: files,
        managers: this.managers,
        comments: [],
      };

      let addressVuex = this.$store.getters['MapAddress/getData'];
      if(addressVuex.addressComponents.latitude){
        postData.addresses = [addressVuex.addressComponents];
      }

      postData.user_id = this.user_id;

      if(this.comment){
        postData.comments.push({ comment: this.comment});
      }

      return postData;
    },
    clearStorages(){
      this.$store.commit('Files/reset');
    },
  },
  mounted(){

  },
  beforeDestroy(){
    this.clearStorages();
  }
}