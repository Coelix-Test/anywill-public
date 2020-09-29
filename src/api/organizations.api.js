import env from "../config/env"

export default {
  getPage(params){
    return env.API.get('/admin/organizations', {
      params: params
    });
  },

  
}