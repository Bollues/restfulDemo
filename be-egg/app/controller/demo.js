'use strict';

const Controller = require('egg').Controller;

class DemoController extends Controller {

  async getTodos() {
    // 请求数据库
    const res = await this.ctx.model.Todo.findAll()
    // 返回结果
    this.ctx.status = 200
    this.ctx.body = res
  }

  async addTodo() {
    // 获取 request 参数
    const params = this.ctx.request.body
    console.log('add params----', params)

    // 请求数据库
    const res = await this.ctx.model.Todo.create(
      {
        'id': params.id,
        'text': params.text,
        'finished': params.finished,
      }
    )

    console.log('insert result----', res)

    // 返回结果
    if (res) {
      this.ctx.status = 200
      this.ctx.body = res
    } else {
      this.ctx.status = 400
      this.ctx.body = 'bad request'
    }
  }

  async finishTodo() {
    const params = this.ctx.request.body
    console.log('finish params----', params)

    const res = await this.ctx.model.Todo.update(
      { 'finished': params.finished },
      {
        where: { 'id': params.id }
      }
    )
    console.log('update result----', res)
    if (res) {
      this.ctx.status = 200
      this.ctx.body = res
    } else {
      this.ctx.status = 400
      this.ctx.body = 'bad request'
    }
  }

  async delTodo() {
    const params = this.ctx.request.body
    console.log('delete params----', params)

    const res = await this.ctx.model.Todo.destroy(
      {
        where: { 'id': params.id }
      }
    )
    console.log('delete result----', res)
    if (res) {
      this.ctx.status = 200
      this.ctx.body = res
    } else {
      this.ctx.status = 400
      this.ctx.body = 'bad request'
    }
  }
}

module.exports = DemoController;