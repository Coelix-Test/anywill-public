<template>
  <div>
    <vs-table>
      <template #thead>
        <vs-tr>
          <!-- <vs-th>Name</vs-th> -->
          <vs-th>Commition</vs-th>
          <vs-th>Actions</vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="option.id"
          v-for="option in options"
          :data="option"
        >
          <!-- <vs-td>
            {{ option.name }}
          </vs-td> -->
          <vs-td>
            {{ option.commition }}
          </vs-td>
          <vs-td>
            <div class="u-flex">
              <vs-button circle icon >
              <i class="bx bx-edit"></i>
            </vs-button>
            <vs-button circle icon color="danger">
              <i class="bx bx-trash"></i>
            </vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <vs-button>Add service</vs-button>
  </div>
</template>

<script>
export default {
  data: () => ({
    edit: null,
  }),
  model: {
    prop: 'options',
    event: 'change'
  },
  props: {
    options: Array,
  }
};
</script>

<style lang="scss">
</style>