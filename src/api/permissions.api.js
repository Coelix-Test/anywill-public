import env from "../config/env"

export default {
  get(params){
    return env.API.get('/permissions');
  },

  
}