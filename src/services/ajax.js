import axios from 'axios';
import { message, Modal } from 'antd';
import { BASEURL, STOREKEY, LOGIN_SIGN_TIMEOUT } from '@/config/env';
import store from 'store';
import { stringify } from 'qs';
import { getValidParam } from '@/utils/tools';

const confirm = Modal.confirm;

// 请求前拦截
axios.interceptors.request.use(
  function(config) {
    const user = store.get(STOREKEY);
    if (user) config.headers.token = user.userid;
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded')
      config.data = stringify(config.data);

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 请求响应拦截
axios.interceptors.response.use(
  function(response) {
    const { data: res } = response;

    if (res.code === LOGIN_SIGN_TIMEOUT) {
      confirm({
        title: res.msg,
        content: '需要回到登录页重新登录！',
        onOk() {
          store.clearAll();
          message.info('正在跳转至登录页面！');
          setTimeout(() => {
            window.location.href = `/user/login?${stringify({
              redirect: window.location.href
            })}`;
          }, 1000);
        },
        onCancel() {}
      });
    }
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

const ajax = async ({
  headers,
  method,
  url,
  data,
  params,
  error,
  cash = false,
  isNeedEmpty
}) => {
  try {
    let config = {
      method,
      url: cash ? url + '?' + +new Date() : BASEURL + url,
      headers,
      data: getValidParam(data, isNeedEmpty),
      params: getValidParam(params, isNeedEmpty)
    };

    const { data: res } = await axios(config);

    if (cash) return res;

    if (res.success) {
      // 成功返回
      return res.data === undefined ? res : res.data;
    }

    if (error) {
      await error(res);
    } else {
      message.error(res.msg);
    }

    return false;
  } catch (err) {
    error &&
      error({
        msg: 'Sorry, 网络发生了错误~'
      });
    return false;
  }
};

export default ajax;
