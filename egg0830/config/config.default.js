/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1567144707128_1991';

  config.mysql={
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'admin',
      // 密码
      password: '123456',
      // 数据库名
      database: 'test',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  //sequelize数据库配置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    database: 'test',
    username: 'admin',
    password: '123456',
  }

  config.security= {
    csrf : {
      enable: false, //开发环境关闭此项，便于跨域请求通过post put delet请求
    }
  }

  // add your middleware config here
  config.middleware = [
    'tokenVerify'
  ];

  // 配置 tokenVerify 中间件的配置
  config.tokenVerify={
    ignore:['/api/login']
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig
  };
};
