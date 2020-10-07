import AddressAutocomplete from '@/components/common/Address/AddressAutocomplete';
import VuexAddressAutocomplete from '@/components/common/Address/VuexAddressAutocomplete';
import ApiAutocomplete from '@/components/common/ApiAutocomplete/ApiAutocomplete';
import ServicesList from '@/components/admin/cemeteries/ServicesList';
import FileUpload from '@/components/common/FileUpload/FileUpload';

import { CemeteriesApi } from '@/api';

export const SingleCemetery = {
  data(){
    return {
      name: '124 Conch St, Holden Beach, NC 28462, USA',
      type: 1,
      classifications: [1],
      options : [],
      // media: [],
      address: '124 Conch St, Holden Beach, NC 28462, USA',
      addressComp: {},
      managers: [2,1],

      comment: '',

      boundToOrganization: true,
      user_id: 0,
      organization: 2,

      typeOptions: [],
      classificationsOptions: [],
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
        address: addressData,
        options: this.options,
        media: files,
        managers: this.managers,
        comments: [],
      };

      if(this.boundToOrganization){
        postData.organization_id = this.organization;
      }
      else{
        postData.user_id = this.user_id;
      }

      if(this.comment){
        postData.comments.push({ comment: this.comment});
      }

      return postData;
    },
    getTypeOptions(){
      CemeteriesApi.getTypes().then(response => this.typeOptions = response.data);
    },
    getClassificationsOptions(){
      CemeteriesApi.getClassifications().then(response => this.classificationsOptions = response.data);
    },
    clearStorages(){
      this.$store.commit('Files/reset');
    },
  },
  mounted(){
    this.getTypeOptions();
    this.getClassificationsOptions();
  },
  beforeDestroy(){
    this.clearStorages();
  }
}