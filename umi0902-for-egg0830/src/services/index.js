
import axios from 'axios';

export async function queryList ({currentPage,pageSize}) {
  const token=window.sessionStorage.getItem('token');
  return axios.get('/api/blog', {
    headers:{
        'current-page':currentPage,'page-size':pageSize,
        'token':token,
    }
  })
  
}

export async function queryInfo ({id}) {
  const token=window.sessionStorage.getItem('token');
  return axios.get(`/api/blog/${id}`, {
    headers:{
      'token':token,
    },
    data:{}
  })
  
}

export async function modifyInfo ({id,title,content}) {
  const token=window.sessionStorage.getItem('token');
  if(id){
      return axios.put(`/api/blog/${id}`, {
          title,content
      },{
        headers:{
          'token':token,
        }
      })
  }else{
      return axios.post(`/api/blog`, {
          title,content
      },{
        headers:{
          'token':token,
        }
      })
  }
  
}

export async function deleteInfo ({id}) {
  const token=window.sessionStorage.getItem('token');
  return axios.delete(`/api/blog/${id}`, {
    headers:{
      'token':token,
    }
  })
  
}

