import env from "../config/env"

export default {

    create(data){
        return env.API.post('/cemeteries', data);
    }
}