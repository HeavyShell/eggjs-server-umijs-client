
import axios from 'axios';

export async function loginSubmit ({username,password}) {

  return axios.post(`/api/login`, {
      username,password
  })
  
}


