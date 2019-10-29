const express = require('express');
const config = require('./config');

var userRouter = require('./user');

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

app.use('/user', userRouter);

app.listen(PORT, function() {
  console.log(`Node app start at port ${PORT}`);
});
