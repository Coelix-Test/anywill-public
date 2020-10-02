import env from "../config/env"

export default {
  getPage(params, role = 'admin'){
    return env.API.get(role + '/users', {
      params: params
    });
  },

  getRoles(){
    return env.API.get('/roles');
  },

  create(data){
    return env.API.post('/admin/users', data);
  },

  
}