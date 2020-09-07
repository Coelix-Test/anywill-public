<template>
  <div>
    <h1>All cemeteries</h1>
    <vs-table
      v-model="selected"
    >
      <template #header>
        <vs-input 
          v-model="search" border placeholder="Search" 
          class="block"
        />
      </template>
      
      <template #thead>
        <vs-th>Name</vs-th>
        <vs-th>Actions</vs-th>
      </template>
      <template #tbody>
        <vs-tr
          :key="cemetery.id"
          v-for="cemetery in cemeteries"
          :data="cemetery"
        >
          <vs-td>{{ cemetery.name }}</vs-td>
          <vs-td>
            <div class="u-flex">

              <router-link :to="{ name: 'cemetery-edit', params: { id: cemetery.id }}">
                <vs-button circle icon >
                  <i class="bx bx-edit"></i>
                </vs-button>
              </router-link>
              
              <vs-button 
                circle icon 
                color="danger"
                @click="deleteCemetery(cemetery.id)"
              >
                <i class="bx bx-trash"></i>
              </vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { CemeteriesApi } from '@/api';

export default {
  data: () => ({
    search: '',
    cemeteries: [],
    selected: [],
  }),
  methods: {
    getCemeteries(){
      CemeteriesApi.getAll()
      .then(data => {
        this.cemeteries = this.selected = data.data;
      });
    },
    deleteCemetery(id){
      CemeteriesApi.delete(id)
      .then(response => {
        if(response.data === 1){
          this.cemeteries = this.cemeteries.filter(el => id !== el.id);
        }
      });
    },
  },
  mounted(){
    this.getCemeteries();
  }
}
</script>

<style>

</style>