'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    
    /**
    这里设定一个账号，当然正常需从数据库中获取
    username=admin password=123456 id=10001
    设定jwt秘钥为abcd1234
     */
    
    const username=ctx.request.body.username;
    const password=ctx.request.body.password;

    if(username=='admin'&&password=='123456'){
        const token=jwt.sign({
          data: {
            id:10001,
            username:'admin',
            password:'123456'
          }
        }, 'abcd1234', { expiresIn: 60*30 }); //s为单位

        ctx.body = {
          success:true,
          data:{
            id:10001,
            username:'admin',
            password:'123456'
          }
        };
        ctx.set('token', token);
        ctx.status = 200;
    }else{
        ctx.body = {
          success:false,
          data:{

          }
        };
        ctx.status = 200;
    }


  }

  async loginverify() {
    const { ctx } = this;
    
    const token=ctx.request.body.token;

    try {
      const decoded=jwt.verify(token, 'abcd1234'); //s为单位
      ctx.body = {
        success:true,
        data:'测试JWT使用demo',
        decoded,
        token,
      };
    } catch(err) {
      // err
      ctx.body = {
      success:true,
      data:'测试JWT使用demo',
      err,
      token
    };
    }
    

    

    ctx.status = 200;

  }

}

module.exports = LoginController;
