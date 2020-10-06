import { UsersApi } from '@/api';
import { mapMutations } from 'vuex'

import UserGeneralInfo from '@/components/admin/users/UserGeneralInfo';
import UserPermissions from '@/components/admin/users/UserPermissions';
import ContactPhoneList from '@/components/common/ContactPhone/ContactPhoneList';
import FileUpload from '@/components/common/FileUpload/FileUpload';
import VuexAddressAutocomplete from '@/components/common/Address/VuexAddressAutocomplete';

export default {
  data: () => ({
    name: '',
    leftTabActive: null,
    leftTabs: [
      { name: 'General Info', component: UserGeneralInfo,},
      { name: 'Contact Info', component: ContactPhoneList,},
      { name: 'Address', component: VuexAddressAutocomplete,},
    ],

    comment: '',
  }),
  components: {
    UserGeneralInfo,
    UserPermissions,
    ContactPhoneList,
    FileUpload,
    VuexAddressAutocomplete,
  },
  computed: {
    showPermissions(){
      return this.$store.getters['UserGeneral/data'].role === 3;
    }
  },
  methods: {
    collectPostData(){
      
      let general = { ...this.$store.getters['UserGeneral/data'] };
      general.password_confirmation = general.passwordConfirmation;
      delete general.passwordConfirmation;
      
      const files = this.$store.getters['Files/getData'].map(e => e.id);
      const contacts = this.$store.getters['ContactPhones/data'].map(item => {
        return {phone: item.phone, platform: item.platform};
      });

      let postData = {
        ...general,
        contacts: contacts,
        media: files,
        addresses: [],
        comments: [ { comment: this.comment} ],
      };
      let addressVuex = this.$store.getters['MapAddress/getData'];
      if(addressVuex.addressComponents.latitude){
        postData.addresses.push({
          ...addressVuex.addressComponents,
        });
      }

      if(this.showPermissions){
        let permissions = this.$store.getters['Permissions/allActive'];
        postData.permissions = permissions;
      }

      // console.log(postData);
      return postData;

    },
    clearStorages(){
      this.$store.commit('UserGeneral/reset');
      this.$store.commit('Files/reset');
      this.$store.commit('ContactPhones/reset');
      this.$store.commit('MapAddress/reset');
      this.$store.commit('Permissions/turnOffAll');
    }
  },
  beforeDestroy(){
    this.clearStorages();
  }
}