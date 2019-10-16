import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import Routers from './Routers';
import store from './store';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './index.less';
import * as serviceWorker from './serviceWorker';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConfigProvider locale={zh_CN}>
          <Component />
        </ConfigProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Routers);

if (module.hot) {
  module.hot.accept(Routers, () => {
    render(Routers);
  });
}

serviceWorker.unregister();
