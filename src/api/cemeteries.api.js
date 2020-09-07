import env from "../config/env"

export default {

  getAll(data){
    return env.API.get('/cemeteries', data);
  },

  create(data){
    return env.API.post('/cemeteries', data);
  },

  get(id){
    return env.API.get('/cemeteries/' + id);
  },

  update(id, data){
    return env.API.put('/cemeteries/' + id, data);
  },

  delete(id){
    return env.API.delete('/cemeteries/' + id);
  }
}