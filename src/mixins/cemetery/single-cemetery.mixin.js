import AddressAutocomplete from '@/components/common/Address/AddressAutocomplete';
import ApiAutocomplete from '@/components/common/ApiAutocomplete/ApiAutocomplete';
import ServicesList from '@/components/admin/cemeteries/ServicesList';

import { CemeteriesApi } from '@/api';

export const SingleCemetery = {
  data(){
    return {
      name: '124 Conch St, Holden Beach, NC 28462, USA',
      type: 1,
      classifications: [1],
      options : [],
      media: [],
      address: '124 Conch St, Holden Beach, NC 28462, USA',
      addressComp: {},
      managers: [2,1],

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
  },
  methods: {
    collectPostData(){
      let addressData = { 
        ...this.addressComp,
        formatted_address: this.address
      };

      const postData = {
        name: this.name,
        type: this.type,
        classifications: this.classifications,
        address: addressData,
        options: this.options,
        media: this.media,
        managers: this.managers
      };

      if(this.boundToOrganization){
        postData.organization_id = this.organization;
      }
      else{
        postData.user_id = this.user_id;
      }

      return postData;
    },
    getTypeOptions(){
      CemeteriesApi.getTypes().then(response => this.typeOptions = response.data);
    },
    getClassificationsOptions(){
      CemeteriesApi.getClassifications().then(response => this.classificationsOptions = response.data);
    },
  },
  mounted(){
    this.getTypeOptions();
    this.getClassificationsOptions();
  }
}