import { Map } from 'immutable';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp'
import router from 'umi/router';
import {loginSubmit} from '../services/login';

const initState = Map({
  token:''
});
export default {
  namespace: 'login',
  state: initState,
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        
        dispatch({ type: 'listener', payload: { pathname } });
        
      });
    },
  },
  effects: {

    * listener({ payload: { pathname } }, { put, call, select }) {
      
      

    },

    * loginSubmit({
      payload
    },{call, put, select}){

      const data = yield call(loginSubmit, {...payload});
      
      if(data.data.success){   
        message.success('登录成功');
        
        yield put({
          type: 'setToken',
          payload:{
            token:data.headers.token
          }
        })
        
        router.push(`/`);
      }else{
        message.error('用户名或密码错误');
      }

    },

    * logout({
      payload
    },{call, put, select}){

      yield put({
        type: 'clearToken',
        payload:{
          
        }
      })
      router.push(`/login`);

    },


  },
  
  reducers: {
    setToken(state, { payload:{token} }) {
      window.sessionStorage.setItem('token',token)
      return state.set('token', token)
    }, 

    clearToken(state, { payload:{} }) {
      window.sessionStorage.removeItem('token')
      return state.set('token', '')
    }, 
    
   
  },
  
}
