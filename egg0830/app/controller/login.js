'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    

    const token=jwt.sign({
      data: {
        id:'aaa111',
        username:'admin'
      }
    }, 'abcd1234', { expiresIn: 20 }); //s为单位

    ctx.body = {
      success:true,
      data:'测试JWT使用demo',
      token
    };

    ctx.set('auth-token', token);
    ctx.status = 200;

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
