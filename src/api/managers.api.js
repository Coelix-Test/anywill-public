import env from "../config/env"

export default {
  getPage(params){
    return env.API.get('/admin/managers', {
      params: params
    });
  },

  get(id){
    return env.API.get('/admin/managers/' + id);
  },

  
}