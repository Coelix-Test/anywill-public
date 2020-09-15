import env from "../config/env"

export default {

  getPage(params){
    return env.API.get('/funeral-homes', {
      params: params
    });
  },

  create(data){
    return env.API.post('/funeral-homes', data);
  },

  get(id){
    return env.API.get('/funeral-homes/' + id);
  },

  update(id, data){
    return env.API.put('/funeral-homes/' + id, data);
  },

  delete(id){
    return env.API.delete('/funeral-homes/' + id);
  }
}