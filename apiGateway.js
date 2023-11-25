const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const proxy = httpProxy.createProxyServer();
const CUSTOMER_APP_URL = 'http://localhost:3001';
const SELLER_APP_URL = 'http://localhost:3002';

proxy.on('error', (err, req, res) => {
  console.error('Proxy Error:', err);
  res.status(500).send('Proxy Error');
});

app.use('/customers', (req, res) => {
  console.log('Proxying request to customer app');
  proxy.web(req, res, { target: CUSTOMER_APP_URL });
});

app.use('/sellers', (req, res) => {
  console.log('Proxying request to seller app');
  proxy.web(req, res, { target: SELLER_APP_URL });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
