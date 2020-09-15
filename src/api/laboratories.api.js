import env from "../config/env"

export default {

  getPage(params){
    return env.API.get('/laboratories', {
      params: params
    });
  },

  create(data){
    return env.API.post('/laboratories', data);
  },

  get(id){
    return env.API.get('/laboratories/' + id);
  },

  update(id, data){
    return env.API.put('/laboratories/' + id, data);
  },

  delete(id){
    return env.API.delete('/laboratories/' + id);
  }
}