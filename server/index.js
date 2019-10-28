const express = require('express');
const config = require('./config');

const { PORT } = config;

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/user/login', function(req, res) {
  res.send('<h1>hello word</h1>');
});

app.listen(PORT, function() {
  console.log(`Node app start at port ${PORT}`);
});
