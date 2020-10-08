<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn
            color="primary"
            @click="updateSingle"
            large
          >
            <span class="font-weight-bold">Update Single</span>
          </v-btn>
        </v-col>
        <v-col cols="4">
          <p class="text-h5">General Info</p>
          <v-container class="px-0">
                <v-text-field
                  label="Name"
                  v-model="name"
                  class="mt-3"
                ></v-text-field>
                <v-textarea
                        label="Description"
                        v-model="description"
                        class="mt-3"
                ></v-textarea>
          </v-container>




          <api-autocomplete
            v-model="user_id"
            label="Select owner"
            api-type="users"
          ></api-autocomplete>

          <api-autocomplete
            v-model="managers"
            label="Select Managers"
            api-type="managers"
            multiple>
          </api-autocomplete>

          <file-upload class="mb-4"></file-upload>

          <v-textarea
            cols="6"
            label="Leave your comment"
            no-resize
            v-model="comment"
          ></v-textarea>
        </v-col>


        <v-col cols="4" >
          <!-- CEMETERIES -->
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header v-slot="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">
                    Cemeteries
                  </v-col>
                  <v-col
                          cols="8"
                          class="text--secondary"
                  >
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row no-gutters>
                    <div v-if="cemeteries.length > 0">
                        <div v-for="cemetery in cemeteries">
                            {{cemetery.name}}

                            <router-link :to="{name:'cemeteries-edit', params: {id: cemetery.private_id}}">View</router-link>
                            <br>
                        </div>
                    </div>
                    <div v-else>
                        No cemeteries defined.
                    </div>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>



            <!-- LABORATORIES -->
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header v-slot="{ open }">
                        <v-row no-gutters>
                            <v-col cols="4">
                                Laboratories
                            </v-col>
                            <v-col
                                    cols="8"
                                    class="text--secondary"
                            >
                            </v-col>
                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row no-gutters>
                            <div v-if="laboratories.length > 0">
                                <div v-for="laboratory in laboratories">
                                    {{laboratory.name}}

                                    <router-link :to="{name:'laboratories-edit', params: {id: laboratory.private_id}}">View</router-link>
                                    <br>
                                </div>
                            </div>
                            <div v-else>
                                No laboratories defined.
                            </div>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>


            <!-- CREMATIONS -->
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header v-slot="{ open }">
                        <v-row no-gutters>
                            <v-col cols="4">
                                Cremations
                            </v-col>
                            <v-col
                                    cols="8"
                                    class="text--secondary"
                            >
                            </v-col>
                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row no-gutters>
                            <div v-if="cremations.length > 0">
                                <div v-for="cremation in cremations">
                                    {{cremation.name}}

                                    <router-link :to="{name:'cemeteries-edit', params: {id: cremations.private_id}}">View</router-link>
                                    <br>
                                </div>
                            </div>
                            <div v-else>
                                No cemeteries defined.
                            </div>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>


            <!-- Funeral Homes -->
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header v-slot="{ open }">
                        <v-row no-gutters>
                            <v-col cols="4">
                                Funeral homes
                            </v-col>
                            <v-col
                                    cols="8"
                                    class="text--secondary"
                            >
                            </v-col>
                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row no-gutters>
                            <div v-if="funeral_homes.length > 0">
                                <div v-for="home in funeral_homes">
                                    {{home.name}}

                                    <router-link :to="{name:'funeral_homes-edit', params: {id: home.private_id}}">View</router-link>
                                    <br>
                                </div>
                            </div>
                            <div v-else>
                                No cemeteries defined.
                            </div>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
        <v-col cols="4" >
          <vuex-address-autocomplete></vuex-address-autocomplete>
        </v-col>

      </v-row>
    </v-container>

  </div>
</template>

<script>
// import VueGoogleAutocomplete from 'vue-google-autocomplete';
import { OrganizationsApi } from '@/api';
import { SingleOrganization } from '@/mixins/organization/single-organization.mixin';

export default {
  mixins: [ SingleOrganization ],
  methods: {
    updateSingle(){
      const postData = this.collectPostData();
        OrganizationsApi.update(this.$route.params.id, postData);
    },
    getSingle(){
        OrganizationsApi.get(this.$route.params.id).then(response => {
        let current = response.data;
        // console.log(current);

        this.name = current.name;
        this.description = current.description;

        //calc address components
        if(current.addresses){
          let addr = response.data.addresses[0];
          delete addr.addressable_id;
          delete addr.addressable_type;
          addr.latitude = parseFloat(addr.latitude);
          addr.longitude = parseFloat(addr.longitude);
          this.$store.commit('MapAddress/updateAddrComp', addr);
        }

        //TODO: cemetery options
        //

        this.cemeteries = current.cemeteries;
        this.laboratories = current.laboratories;
        this.cremations = current.cremations;
        this.funeral_homes = current.funeral_homes;

        this.managers = current.managers.map(e => e.id);

        this.user_id = current.user_id;

        if(response.data.comments.length){
          this.comment = response.data.comments[0].comment;
        }

        if(response.data.media && response.data.media.length){
          response.data.media.forEach(item => {
            this.$store.commit('Files/addFile', item);
          });
        }

      });
    },
  },
  mounted(){
    this.getSingle();
  }
}
</script>

<style lang="scss" scoped>

</style>