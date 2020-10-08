<template>
  <v-container>
    <v-row>
      <v-col cols="12"><div class="text-h5">Create transaction</div></v-col>
      <v-col cols="4">
        <v-select
          :items="types"
          label="Select transaction type"
          item-text="name"
          item-value="id"
          v-model="type"
        >  
        </v-select>
      </v-col>
      <v-col cols="8"></v-col>

      <v-col cols="4" v-if="type === 1">
        <api-autocomplete
          label="From"
          type="users"
          v-model="fromUser"
        >
        </api-autocomplete>
      </v-col>
      <v-col cols="4">
        <v-text-field
          label="Amount"
          v-model="amount"
          prefix="$"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="4" v-if="type === 1">
        <api-autocomplete
          label="To"
          type="users"
          v-model="toUser"
        >
        </api-autocomplete>
      </v-col>
      
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-textarea
          label="Description"
          v-model="description"
        ></v-textarea>
        <v-btn color="primary" 
          dark large
          @click="createSingle"
        >
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { TransactionsApi } from '@/api';
import ApiAutocomplete from '@/components/common/ApiAutocomplete/ApiAutocomplete';

export default {
  data: () => ({
    type: 1,
    // type: null,
    types: [],
    description: '',
    amount: 0,
    fromUser: null,
    toUser: null, 
    provider: 0,
  }),
  components: {
    ApiAutocomplete,
  },
  methods: {
    getTypes(){
      TransactionsApi.getTypes().then((response) => {
        
        response.data.forEach( (element, index) => {
          this.types.push({
            id: index+1,
            name: element, 
          });
        });
      });
    },
    collectPostData(){
      let postData = {
        type: this.type,
        amount: this.amount,
        description: this.description,
        provider: this.provider,
      };

      if(this.type === 1){
        postData.from_user_id = this.fromUser;
        postData.to_user_id = this.toUser;
      }
    },
    createSingle(){
      const postData = this.collectPostData();
      TransactionsApi.create(postData).then(response => {
        console.log(response);
        if(response.data){
          this.$router.push({name: 'transactions-edit', params: {
            id: response.data.private_id,
          }});
        }
      });
    }
  },
  mounted(){
    this.getTypes();
  }
}
</script>

<style lang="scss" scoped>

</style>