import env from "../config/env"

export default {

  getPage(params){
    return env.API.get('/cemeteries', {
      params: params
    });
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
  },

  getTypes(){
    return env.API.get('/cemetery-types');
  },
  
  getClassifications(){
    return env.API.get('/cemetery-classifications');
  }
}