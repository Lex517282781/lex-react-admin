const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const resolvePath = pathStr => path.join(__dirname, pathStr);

const routers = fs
  .readdirSync(resolvePath('routers'))
  .map(item => path.basename(item, '.js'));

const { PORT } = config;

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, token'
  );
  next();
});

routers.forEach(item => {
  app.use(`/${item}`, require(`./routers/${item}`));
});

app.listen(PORT, function() {
  console.log(`Node app start at port ${PORT}`);
});
