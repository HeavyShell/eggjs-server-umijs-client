import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import { Table, Divider, Button, Popconfirm } from 'antd';
import { connect } from 'dva';
import { Component } from 'React';
import Link from "umi/link";

const Comp=({dispatch,blog}) => {

  const columns=[
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => (
          <Link to={`/info/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
        render: text => <div>{text}</div>,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`/edit/${record.id}`}>编辑</Link>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除此数据?"
              onConfirm={()=>confirmDelete(record)}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        ),
      },
  ];

  const data=blog.get('list');

  function confirmDelete(record){
    
    dispatch({
      type:'blog/deleteInfo',
      payload:{
        id:record.id
      }
    })
  }

  function tableOnchange(pagination){
    const {current,pageSize} = pagination;
    
    dispatch({
      type:'blog/queryList',
      payload:{
        currentPage:current,
        pageSize:pageSize,
      }
    })
  }

  return (
    <div className={styles.list}>
      <div style={{textAlign:'right'}}>
        <Button type={'default'} size={'small'} onClick={()=>{
          dispatch({
            type:'login/logout',
            payload:{
              
            }
          })
        }}>退出</Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey={'id'}
        title={()=><div><Link to={`/edit`}><Button type={'primary'} size={'small'}>新增</Button></Link></div>}
        pagination={{
          current: blog.get('currentPage'),
          pageSize: blog.get('pageSize'),
          total: blog.get('total')
        }}
        onChange={tableOnchange}
      />
    </div>
  );
  
  
}

export default connect(({
  blog
})=>({
  blog
}))(Comp)
