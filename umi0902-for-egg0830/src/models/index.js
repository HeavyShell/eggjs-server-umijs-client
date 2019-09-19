import { Map } from 'immutable';
import pathToRegexp from 'path-to-regexp'
import router from 'umi/router';
import {queryList, queryInfo, modifyInfo, deleteInfo} from '../services/index';

const initState = Map({
  list:[],
  info:{},
  pageSize:3,
  currentPage:1,
  total:0
});
export default {
  namespace: 'blog',
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
      
      if(pathToRegexp('/').exec(pathname)){
        yield put({
          type: 'queryList',
          payload:{

          }
        })
      }else if(pathToRegexp('/info/:id').exec(pathname)){
        const id=pathToRegexp('/info/:id').exec(pathname)[1];
        yield put({
          type: 'queryInfo',
          payload:{
            id
          }
        })
      }else if(pathToRegexp('/edit/:id').exec(pathname)){
        const id=pathToRegexp('/edit/:id').exec(pathname)[1];
        yield put({
          type: 'queryInfo',
          payload:{
            id
          }
        })
      }else if(pathToRegexp('/edit').exec(pathname)){
        yield put({
          type:'setInfoData',
          payload:{
            info:{}
          }
        })
      }

    },

    * queryList({
      payload
    },{call, put, select}){

      const currentPage = yield payload.currentPage || select(_=>_.blog.getIn(['currentPage']));
      const pageSize = yield payload.pageSize || select(_=>_.blog.getIn(['pageSize']));

      const data = yield call(queryList, {...payload, currentPage, pageSize});
      
      if(data.data.success){   

        //判断当前页不是第一页，并且查询数据为空，则被动查询上一页数据，并更新视图
        if(data.data.data.length==0 && currentPage>1){
          const dataPrev = yield call(queryList, {...payload, currentPage:currentPage-1, pageSize});
      
          if(dataPrev.data.success){

            yield put({
              type:'login/setToken',
              payload:{
                token:dataPrev.headers.token
              }
            })
            
            yield put({
              type:'setListData',
              payload:{
                list:dataPrev.data.data,
                pageSize,
                currentPage:currentPage-1,
                total:dataPrev.headers['total']
              }
            })
          }else{
            if(dataPrev.data.status==401){
              router.push(`/login`);
            }
          }

        }else{

          yield put({
            type:'login/setToken',
            payload:{
              token:data.headers.token
            }
          })
          
          yield put({
            type:'setListData',
            payload:{
              list:data.data.data,
              pageSize,
              currentPage,
              total:data.headers['total']
            }
          })
        }

      }else{
        if(data.data.status==401){
          router.push(`/login`);
        }
      }

    },

    * queryInfo({
      payload
    },{call, put, select}){

      const data = yield call(queryInfo, {...payload});
      
      if(data.data.success){   
        
        yield put({
          type:'login/setToken',
          payload:{
            token:data.headers.token
          }
        })

        yield put({
          type:'setInfoData',
          payload:{
            info:data.data.data
          }
        })
      }else{
        if(data.data.status==401){
          router.push(`/login`);
        }
      }

    },

    * modifyInfo({
      payload
    },{call, put, select}){

      const data = yield call(modifyInfo, {...payload});
      
      if(data.data.success){

        yield put({
          type:'login/setToken',
          payload:{
            token:data.headers.token
          }
        })   

        router.goBack();
      }else{
        if(data.data.status==401){
          router.push(`/login`);
        }
      }

    },

    * deleteInfo({
      payload
    },{call, put, select}){

      const data = yield call(deleteInfo, {...payload});
      
      if(data.data.success){ 

        yield put({
          type:'login/setToken',
          payload:{
            token:data.headers.token
          }
        })

        yield put({
          type: 'queryList',
          payload:{

          }
        })
      }else{
        if(data.data.status==401){
          router.push(`/login`);
        }
      }

    },

  },
  
  reducers: {
    setListData(state, { payload:{list,pageSize,currentPage,total} }) {
      return state.set('list', list)
                  .set('pageSize', pageSize)
                  .set('currentPage', currentPage)
                  .set('total', parseInt(total))
    }, 

    setInfoData(state, { payload:{info} }) {
      return state.set('info', info)
    }, 

    
   
  },
  
}
