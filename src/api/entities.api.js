import env from "../config/env"

export default {

  getAll(){
    return env.API.get('/entities');
  },
}