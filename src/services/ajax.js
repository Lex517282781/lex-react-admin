import axios from 'axios';
import { message, Modal } from 'antd';
import { BASEURL, STOREKEY, LOGIN_SIGN_TIMEOUT } from '@/config/env';
import store from 'store';
import qs from 'qs';
import { getValidParam } from '@/utils/tools';

const confirm = Modal.confirm;

let hide = null;
const ajax = async ({
  headers,
  method,
  url,
  data,
  params,
  waitting,
  error,
  cash = false,
  isNeedEmpty
}) => {
  if (waitting) {
    // 自定义请求等待状态
    waitting();
  } else {
    hide = message.loading('加载中..', 0);
  }
  try {
    const user = store.get(STOREKEY);
    let headersVal = {
      ...headers
    };
    if (user) headersVal.token = user.id;

    let config = {
      method,
      url: cash ? url + '?' + +new Date() : BASEURL + url,
      headers: headersVal,
      data: getValidParam(data, isNeedEmpty),
      params: getValidParam(params, isNeedEmpty)
    };

    if (headersVal['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data);
    }

    const { data: res } = await axios(config);

    if (cash) return res;

    if (res.success) {
      // 成功返回
      if (!waitting) hide();
      return res.data === undefined ? res : res.data;
    }

    if (res.code === LOGIN_SIGN_TIMEOUT) {
      confirm({
        title: res.errorMessage,
        content: '需要回到登录页重新登录！',
        onOk() {
          store.remove(STOREKEY);
          message.info('正在跳转至登录页面！');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        onCancel() {}
      });
    }

    if (!waitting) hide();

    if (error) {
      await error(res);
    } else {
      message.error(res.errorMessage);
    }

    return false;
  } catch (err) {
    error &&
      error({
        errorMessage: 'Sorry, 网络发生了错误~'
      });
    hide && hide();
    return false;
  }
};

export default ajax;
