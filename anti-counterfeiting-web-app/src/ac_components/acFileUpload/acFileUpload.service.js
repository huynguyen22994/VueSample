import * as axios from 'axios'

const BASE_URL = 'http://localhost:9999'

function upload (formData) {
  const url = `${BASE_URL}/upload/product/upload`
  return axios.post(url, formData)
  // get data
    .then(x => x.data)
    .then((x) => {
      x['url'] = `${BASE_URL}/${x.path}`
      return x
    })  
}

export { upload }