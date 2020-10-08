<!--
TODO:
- Adding services
-->
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn
                  color="primary"
                  @click="createSingle"
                  large
          >
            <span class="font-weight-bold">Create Single</span>
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


        <!--<v-col cols="4" >-->
          <!--&lt;!&ndash; CEMETERIES &ndash;&gt;-->
          <!--<v-expansion-panels>-->
            <!--<v-expansion-panel>-->
              <!--<v-expansion-panel-header v-slot="{ open }">-->
                <!--<v-row no-gutters>-->
                  <!--<v-col cols="4">-->
                    <!--Cemeteries-->
                  <!--</v-col>-->
                  <!--<v-col-->
                          <!--cols="8"-->
                          <!--class="text&#45;&#45;secondary"-->
                  <!--&gt;-->
                  <!--</v-col>-->
                <!--</v-row>-->
              <!--</v-expansion-panel-header>-->
              <!--<v-expansion-panel-content>-->
                <!--<v-row no-gutters>-->
                  <!--<div v-if="cemeteries.length > 0">-->
                    <!--<div v-for="cemetery in cemeteries">-->
                      <!--{{cemetery.name}}-->

                      <!--<router-link :to="{name:'cemeteries-edit', params: {id: cemetery.private_id}}">View</router-link>-->
                      <!--<br>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div v-else>-->
                    <!--No cemeteries defined.-->
                  <!--</div>-->
                <!--</v-row>-->
              <!--</v-expansion-panel-content>-->
            <!--</v-expansion-panel>-->
          <!--</v-expansion-panels>-->



          <!--&lt;!&ndash; LABORATORIES &ndash;&gt;-->
          <!--<v-expansion-panels>-->
            <!--<v-expansion-panel>-->
              <!--<v-expansion-panel-header v-slot="{ open }">-->
                <!--<v-row no-gutters>-->
                  <!--<v-col cols="4">-->
                    <!--Laboratories-->
                  <!--</v-col>-->
                  <!--<v-col-->
                          <!--cols="8"-->
                          <!--class="text&#45;&#45;secondary"-->
                  <!--&gt;-->
                  <!--</v-col>-->
                <!--</v-row>-->
              <!--</v-expansion-panel-header>-->
              <!--<v-expansion-panel-content>-->
                <!--<v-row no-gutters>-->
                  <!--<div v-if="laboratories.length > 0">-->
                    <!--<div v-for="laboratory in laboratories">-->
                      <!--{{laboratory.name}}-->

                      <!--<router-link :to="{name:'laboratories-edit', params: {id: laboratory.private_id}}">View</router-link>-->
                      <!--<br>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div v-else>-->
                    <!--No laboratories defined.-->
                  <!--</div>-->
                <!--</v-row>-->
              <!--</v-expansion-panel-content>-->
            <!--</v-expansion-panel>-->
          <!--</v-expansion-panels>-->


          <!--&lt;!&ndash; CREMATIONS &ndash;&gt;-->
          <!--<v-expansion-panels>-->
            <!--<v-expansion-panel>-->
              <!--<v-expansion-panel-header v-slot="{ open }">-->
                <!--<v-row no-gutters>-->
                  <!--<v-col cols="4">-->
                    <!--Cremations-->
                  <!--</v-col>-->
                  <!--<v-col-->
                          <!--cols="8"-->
                          <!--class="text&#45;&#45;secondary"-->
                  <!--&gt;-->
                  <!--</v-col>-->
                <!--</v-row>-->
              <!--</v-expansion-panel-header>-->
              <!--<v-expansion-panel-content>-->
                <!--<v-row no-gutters>-->
                  <!--<div v-if="cremations.length > 0">-->
                    <!--<div v-for="cremation in cremations">-->
                      <!--{{cremation.name}}-->

                      <!--<router-link :to="{name:'cemeteries-edit', params: {id: cremations.private_id}}">View</router-link>-->
                      <!--<br>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div v-else>-->
                    <!--No cemeteries defined.-->
                  <!--</div>-->
                <!--</v-row>-->
              <!--</v-expansion-panel-content>-->
            <!--</v-expansion-panel>-->
          <!--</v-expansion-panels>-->


          <!--&lt;!&ndash; Funeral Homes &ndash;&gt;-->
          <!--<v-expansion-panels>-->
            <!--<v-expansion-panel>-->
              <!--<v-expansion-panel-header v-slot="{ open }">-->
                <!--<v-row no-gutters>-->
                  <!--<v-col cols="4">-->
                    <!--Cemeteries-->
                  <!--</v-col>-->
                  <!--<v-col-->
                          <!--cols="8"-->
                          <!--class="text&#45;&#45;secondary"-->
                  <!--&gt;-->
                  <!--</v-col>-->
                <!--</v-row>-->
              <!--</v-expansion-panel-header>-->
              <!--<v-expansion-panel-content>-->
                <!--<v-row no-gutters>-->
                  <!--<div v-if="funeral_homes.length > 0">-->
                    <!--<div v-for="home in funeral_homes">-->
                      <!--{{home.name}}-->

                      <!--<router-link :to="{name:'funeral_homes-edit', params: {id: home.private_id}}">View</router-link>-->
                      <!--<br>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div v-else>-->
                    <!--No cemeteries defined.-->
                  <!--</div>-->
                <!--</v-row>-->
              <!--</v-expansion-panel-content>-->
            <!--</v-expansion-panel>-->
          <!--</v-expansion-panels>-->
        <!--</v-col>-->
        <v-col cols="4" >
          <vuex-address-autocomplete></vuex-address-autocomplete>
        </v-col>

      </v-row>
    </v-container>

  </div>
</template>

<script>
import { OrganizationsApi } from '@/api';
import { SingleOrganization } from '@/mixins/organization/single-organization.mixin';



export default {
  mixins: [ SingleOrganization ],
  methods: {
    createSingle(){

      let postData = this.collectPostData();
        OrganizationsApi.create(postData).then(response => {
        if(response.data.private_id){
          // this.$router.push({name: 'cemeteries-edit', params: { id: response.data.private_id} } );
        }
      });
      
    },
  },
}
</script>

<style lang="scss" scoped>

</style>