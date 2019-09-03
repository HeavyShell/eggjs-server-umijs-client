'use strict';

const Controller = require('egg').Controller;

class SearchController extends Controller {
  async index() {
    const { ctx } = this;
    const q = ctx.query.q || 'nodejs';

    ctx.redirect(`http://cn.bing.com/search?q=${q}`);

  }
}

module.exports = SearchController;
