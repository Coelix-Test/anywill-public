import env from "../config/env"

export default {
  getPage(params){
    return env.API.get('/admin/organizations', {
      params: params
    });
  },

  create(data){
      return env.API.post('/organizations', data);
  },

  get(id){
      return env.API.get('/organizations/' + id);
  },

  update(id, data){
      return env.API.put('/organizations/' + id, data);
  },

  delete(id){
      return env.API.delete('/organizations/' + id);
  },



  
}