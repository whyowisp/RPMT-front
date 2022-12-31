Proxying in this react app:

install

```npm install --save-dev http-proxy-middleware```

create file setupProxy.js in the src folder and copy/paste

```
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  )
}
```