const express = require('express');
const config = require('./config');

const commonRouter = require('./routers/common');
const userRouter = require('./routers/user');
const dashboardanalysisRouter = require('./routers/dashboardanalysis');
const dashboardmonitorRouter = require('./routers/dashboardmonitor');
const dashboardworkplaceRouter = require('./routers/dashboardworkplace');

const formbasicRouter = require('./routers/formbasic');

const listsearchRouter = require('./routers/listsearch');
const listbasicRouter = require('./routers/listbasic');
const listcardRouter = require('./routers/listcard');
const listarticlesRouter = require('./routers/listarticles');
const listprojectsRouter = require('./routers/listprojects');
const listapplicationsRouter = require('./routers/listapplications');
const profilebasicRouter = require('./routers/profilebasic');
const profileadvancedRouter = require('./routers/profileadvanced');

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

app.use('/common', commonRouter);
app.use('/user', userRouter);
app.use('/dashboardanalysis', dashboardanalysisRouter);
app.use('/dashboardmonitor', dashboardmonitorRouter);
app.use('/dashboardworkplace', dashboardworkplaceRouter);

app.use('/formbasic', formbasicRouter);

app.use('/listsearch', listsearchRouter);
app.use('/listbasic', listbasicRouter);
app.use('/listcard', listcardRouter);
app.use('/listarticles', listarticlesRouter);
app.use('/listprojects', listprojectsRouter);
app.use('/listapplications', listapplicationsRouter);
app.use('/profilebasic', profilebasicRouter);
app.use('/profileadvanced', profileadvancedRouter);

app.listen(PORT, function() {
  console.log(`Node app start at port ${PORT}`);
});
