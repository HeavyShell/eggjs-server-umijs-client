import styles from '../index.css';
import { formatMessage } from 'umi-plugin-locale';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';
import { Component } from 'React';
import Link from "umi/link";

const Comp=({dispatch,login,form,match}) => {

  const {getFieldDecorator,validateFields} = form;
  

  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 16
    },
  };

  const formItemLayoutButton = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 16,
      offset:4
    }
  };

  function handleSubmit(e){
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        
        dispatch({
          type:'login/loginSubmit',
          payload:{
            ...values
          }
        })
      }
    });
  }

  return (
    <div className={styles.login}>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="用户名">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
            initialValue:''
          })(
            <Input
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
            initialValue:''
          })(
            <Input
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item {...formItemLayoutButton}>
          <Button type="primary" htmlType="submit" >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
  
  
}

export default connect(({
  login
})=>({
  login
}))(Form.create()(Comp))
