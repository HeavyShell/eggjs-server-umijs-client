import styles from '../index.css';
import { formatMessage } from 'umi-plugin-locale';
import { Descriptions, Button } from 'antd';
import { connect } from 'dva';
import { Component } from 'React';
import Link from "umi/link";
import router from 'umi/router';

const Comp=({dispatch,blog}) => {

  const data=blog.get('info');

  return (
    <div className={styles.info}>
      <Descriptions title="详情" bordered>
        <Descriptions.Item label="标题" span={3}>{data.title}</Descriptions.Item>
        <Descriptions.Item label="正文" span={3}>{data.content}</Descriptions.Item>
      </Descriptions>
      <Button style={{marginTop:'20px'}} type={'primary'} size={'small'} onClick={()=>{
        router.goBack();
      }}>返回</Button>
    </div>
  );
  
  
}

export default connect(({
  blog
})=>({
  blog
}))(Comp)
