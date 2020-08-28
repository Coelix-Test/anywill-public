import env from "../config/env"

export default {

    create(data){
        return env.API.post('/services/create', data);
    }
}