'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const currentPage=parseInt(ctx.get('current-page'));
    const pageSize=parseInt(ctx.get('page-size'));
    // 调用 service 进行业务处理
    const res = await ctx.service.home.query({pageSize,currentPage});
    ctx.body = {
      success:res.success,
      data:res.data,
    };
    ctx.set('total', res.total);
    ctx.status = 200;

  }

  async info() {
    const { ctx } = this;

    // 调用 service 进行业务处理
    const res = await ctx.service.home.info(ctx.params.id);
    ctx.body = res;
    ctx.status = 200;

  }

  async add() {
    const { ctx } = this;

    // 调用 service 进行业务处理
    const res = await ctx.service.home.add(ctx.request.body);
    ctx.body = res;
    ctx.status = 200;

  }

  async put() {
    const { ctx } = this;

    // 调用 service 进行业务处理
    const res = await ctx.service.home.put({id:ctx.params.id, ...ctx.request.body});
    ctx.body = res;
    ctx.status = 200;

  }

  async delete() {
    const { ctx } = this;

    // 调用 service 进行业务处理
    const res = await ctx.service.home.delete({id:ctx.params.id});
    ctx.body = res;
    ctx.status = 200;

  }
}

module.exports = HomeController;
