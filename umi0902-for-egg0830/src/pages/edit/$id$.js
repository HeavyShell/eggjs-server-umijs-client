import styles from '../index.css';
import { formatMessage } from 'umi-plugin-locale';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';
import { Component } from 'React';
import Link from "umi/link";

const Comp=({dispatch,blog,form,match}) => {

  const {getFieldDecorator,validateFields} = form;
  const data=blog.get('info');

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
        
        const id = match.params.id;
        dispatch({
          type:'blog/modifyInfo',
          payload:{
            ...values,
            id
          }
        })
      }
    });
  }

  return (
    <div className={styles.info}>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="标题">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题' }],
            initialValue:data.title
          })(
            <Input
              placeholder="标题"
            />,
          )}
        </Form.Item>
        <Form.Item label="正文">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入正文' }],
            initialValue:data.content
          })(
            <Input.TextArea
              rows={4}
              placeholder="正文"
            />,
          )}
        </Form.Item>
        <Form.Item {...formItemLayoutButton}>
          <Button type="primary" htmlType="submit" >
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
  
  
}

export default connect(({
  blog
})=>({
  blog
}))(Form.create()(Comp))
