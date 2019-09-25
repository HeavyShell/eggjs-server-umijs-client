
const Service = require('egg').Service;

class HomeService extends Service {
  async query({pageSize,currentPage}) {
    const results = await this.app.mysql.select('eggjs_blog',{offset:(currentPage-1)*pageSize,limit:pageSize});
    const all = await this.app.mysql.select('eggjs_blog');
    return {
      success:true,
      data:results,
      total:all.length
    };
  }

  async info(id) {
    // const results = await this.app.mysql.get('eggjs_blog' , { id:id });
    // 此处demo，仅在查询详情的service中使用model形式获取数据
    const results = await this.app.model.Blog.findOne({'where':{ id:id }});
    return {
      success:results?true:false,
      data:results || {}
    };
  }

  async add({title,content}) {
    const results = await this.app.mysql.insert('eggjs_blog' , { title, content });
    return {
      success:results.affectedRows==1?true:false,
      data:{
        id:results.insertId
      }
    };
  }

  async put({id,title,content}) {
    const results = await this.app.mysql.update('eggjs_blog' , { id, title, content });
    return {
      success:results.affectedRows==1?true:false,
      data:{
        id
      }
    };
  }

  async delete({id}) {
    const results = await this.app.mysql.delete('eggjs_blog' , { id });
    return {
      success:results.affectedRows==1?true:false,
      data:{
        id
      }
    };
  }
}

module.exports = HomeService;