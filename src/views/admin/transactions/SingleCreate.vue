<template>
  <v-container>
    <v-row>
      <v-col cols="12"><div class="text-h5">Create transaction</div></v-col>
      <v-col cols="2">
        <v-select
          :items="types"
          label="Select transaction type"
          item-text="name"
          item-value="name"
          v-model="type"
        >  
        </v-select>
      </v-col>

      <v-col cols="2">
        <v-autocomplete
          v-model="currency"
          :items="currencies"
          label="Currency"
          item-value="id"
          item-text="currency"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="8"></v-col>

      <v-col cols="2">
        <api-autocomplete
          label="From"
          type="users"
          v-model="fromUser"
        >
        </api-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-text-field
          label="Amount"
          v-model="amount"
          prefix="$"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="2" v-if="type === 'transfer'">
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
    type: 'transfer',
    // type: null,
    types: [],
    description: '',
    amount: 0,
    fromUser: null,
    toUser: null, 
    provider: 0,
    currency: 0,
    currencies: []
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
    getCurrencies(){
      TransactionsApi.getCurrencies().then(response => {
        response.data.forEach(item => this.currencies.push(item));
      });
    },
    collectPostData(){
      let postData = {
        type: this.type,
        amount: this.amount,
        description: this.description,
        provider: this.provider,
        currency: this.currency,
        from_user_id: this.fromUser,
      };

      if(this.type === 'transfer'){
        postData.to_user_id = this.toUser;
      }
      return postData;
    },
    createSingle(){
      let postData = this.collectPostData();
      console.log('postData', postData);
      TransactionsApi.create(postData).then(response => {
        console.log(response);
        if(response.data){
          this.$router.push({name: 'transactions-all', params: {
            id: response.data.private_id,
          }});
        }
      });
    }
  },
  mounted(){
    this.getTypes();
    this.getCurrencies();
  }
}
</script>

<style lang="scss" scoped>

</style>