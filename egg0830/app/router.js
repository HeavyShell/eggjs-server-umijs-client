'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //博客路由
  router.get('/api/blog', controller.home.index);
  router.get('/api/blog/:id', controller.home.info);
  router.post('/api/blog', controller.home.add);
  router.put('/api/blog/:id', controller.home.put);
  router.delete('/api/blog/:id', controller.home.delete);

  router.post('/api/login', controller.login.index);

  router.post('/api/login2', controller.login.loginverify);

  router.get('/search', controller.search.index);
};
