export default {
  namespaced: true,
  state: {
    options: [
      {
        id: 0,
        name: 'Name',
        description: 'Plain text',
        hasSubOpt: true,
        services: [
          {
            id: 0,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          },
          {
            id: 1,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          },
          {
            id: 2,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          }
        ]
      },
      {
        id: 1,
        name: 'Name 1',
        description: 'Plain text',
        hasSubOpt: true,
        services: [
          {
            id: 0,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          },
          {
            id: 1,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          },
          {
            id: 2,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Name 2',
        description: 'Plain text',
        hasSubOpt: true,
        services: [
          {
            id: 0,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          },
          {
            id: 1,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          },
          {
            id: 2,
            name : "Select transfer by",
            options: [
              { name: "by car"},
              { name: "by plain"}
            ]
          }
        ]
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    getById: state => id => {
      return state.options.find(item => item.id === id);
    },
  }
}