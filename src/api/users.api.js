import env from "../config/env"

export default {
  getPage(params, role = 'admin'){
    return env.API.get(role + '/users', {
      params: params
    });
  },

  
}