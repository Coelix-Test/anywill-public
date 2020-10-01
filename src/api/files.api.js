import env from "../config/env"

export default {

  upload(file) {

    let data = new FormData();
    data.append('files[]', file);

    return env.API.post('/media', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  },
}