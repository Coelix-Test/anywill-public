import env from "../config/env"

export default {

  getPage(params){
    return env.API.get('/services', {
      params: params
    });
  },

  create(data){
    return env.API.post('/services', data);
  },

  get(id){
    return env.API.get('/services/' + id);
  },

  update(id, data){
    return env.API.put('/services/' + id, data);
  },

  delete(id){
    return env.API.delete('/services/' + id);
  }
}