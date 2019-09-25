'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Blog = app.model.define('blog', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(30),
    content: INTEGER,
  },{
    timestamps: false, //忽略时间字段create_at等，因为Sequelize会默认视为拥有该字段
    tableName: 'eggjs_blog', //指定表名
  });

  return Blog;
};