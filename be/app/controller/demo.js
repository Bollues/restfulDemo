const Controller = require('egg').Controller;

class DemoController extends Controller {
  async getTodos() {
    this.ctx.body = 'Hello world';
  }
}

module.exports = DemoController;