const express = require('express');
const config = require('./config');

const userRouter = require('./routers/user');
const dashboardanalysisRouter = require('./routers/dashboardanalysis');
const dashboardmonitorRouter = require('./routers/dashboardmonitor');
const dashboardworkplaceRouter = require('./routers/dashboardworkplace');

const formbasicRouter = require('./routers/formbasic');

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
app.use('/dashboardanalysis', dashboardanalysisRouter);
app.use('/dashboardmonitor', dashboardmonitorRouter);
app.use('/dashboardworkplace', dashboardworkplaceRouter);

app.use('/formbasic', formbasicRouter);

app.listen(PORT, function() {
  console.log(`Node app start at port ${PORT}`);
});
  