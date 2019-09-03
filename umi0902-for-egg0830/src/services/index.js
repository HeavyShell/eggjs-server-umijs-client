
import axios from 'axios';

export async function queryList ({currentPage,pageSize}) {
  
  return axios.get('/api/blog', {
    headers:{
        'current-page':currentPage,'page-size':pageSize
    }
  })
  
}

export async function queryInfo ({id}) {
  
  return axios.get(`/api/blog/${id}`, {
    headers:{},
    data:{}
  })
  
}

export async function modifyInfo ({id,title,content}) {
  
  if(id){
      return axios.put(`/api/blog/${id}`, {
          title,content
      })
  }else{
      return axios.post(`/api/blog`, {
          title,content
      })
  }
  
}

export async function deleteInfo ({id}) {
  
  return axios.delete(`/api/blog/${id}`, {})
  
}

