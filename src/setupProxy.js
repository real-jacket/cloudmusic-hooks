const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/m-api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      pathRewrite: {
        '^/m-api':''
      }
    })
  );
};