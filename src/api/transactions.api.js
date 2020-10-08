import env from "../config/env"

export default {

  getPage(params){
    return env.API.get('admin/transactions', {
      params: params
    });
  },

  create(data){
    return env.API.post('admin/transactions', data);
  },

  // get(id){
  //   return env.API.get('/cemeteries/' + id);
  // },

  // update(id, data){
  //   return env.API.put('/cemeteries/' + id, data);
  // },

  delete(id){
    return env.API.delete('admin/cemeteries/' + id);
  },

  getTypes(){
    return env.API.get('/transaction-types');
  },
  
  // getClassifications(){
  //   return env.API.get('/cemetery-classifications');
  // }
}