const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://127.0.0.1:7001', 
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      /*
      	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
      	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
      	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
      */
      //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
      pathRewrite: {
        '^/api/getTodos': '/api/getTodos',
        '^/api/addTodo': '/api/addTodo',
        '^/api/finishTodo': '/api/finishTodo',
        '^/api/delTodo': '/api/delTodo',
      }
    })
    
  )
}