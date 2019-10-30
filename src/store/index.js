import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxReset from 'redux-reset';
// import { createLogger } from 'redux-logger';
import reducer from './rootReducer';
import initData from './common/initData';
import { stateUpdate } from './actionCreators';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  //创建中间件logger
  // const logger = createLogger();
  // middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares), reduxReset())
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./rootReducer', () => {
    const nextRootReducer = require('./rootReducer');
    store.replaceReducer(nextRootReducer);
  });
}

// 初始化应用设置
Object.entries(initData).forEach(([key, val]) => {
  store.dispatch(
    stateUpdate({
      namespace: `common/${key}`,
      data: val
    })
  );
});

export default store;
