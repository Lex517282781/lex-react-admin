const express = require('express');
const config = require('./config');

const { PORT } = config;

const app = express();

app.get('/', function(req, res) {
  res.send('<h1>hello word</h1>');
});

app.listen(PORT, function() {
  console.log(`Node app start at port ${PORT}`);
});
