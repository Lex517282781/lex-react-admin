import { REQUEST, SUCCESS, FAILURE, UPDATE } from './types';
import { message } from 'antd';
import Service from '@/services';

const generateState = (namespace, action) => {
  let [page, state] = namespace.split('/');
  let type = '';
  if (state) {
    type = `${page.toUpperCase()}/${state.toUpperCase()}/${action}`;
  } else {
    type = `${page.toUpperCase()}/${REQUEST}`;
    state = page;
  }
  return {
    type, // redux 中的 type
    state: namespace // redux 中的 分支数据 数据结构如 页面数据/模块数据/详细数据 page/module/details
  };
};

const stateRequest = namespace => {
  return generateState(namespace, REQUEST);
};

export const stateSuccess = ({ namespace, data }) => {
  return {
    ...generateState(namespace, SUCCESS),
    data
  };
};

const stateFailure = ({ namespace, msg }) => {
  return {
    ...generateState(namespace, FAILURE),
    msg
  };
};

export const stateUpdate = ({ namespace, data, extend = false }) => {
  return {
    ...generateState(namespace, UPDATE),
    data,
    extend
  };
};

export const stateFetch = ({ namespace, api, data, params }) => {
  return dispatch => {
    dispatch(stateRequest(namespace));

    return new Promise(async (resolve, reject) => {
      let res = await Service[api]({
        data, // post 参数
        params, // get delete 参数
        error: err => {
          reject({ data, params, err });
          message.error(err.msg);
          dispatch(stateFailure({ namespace, msg: err.msg }));
        }
      });
      if (!res) return;
      resolve({ data, params, res });
      dispatch(stateSuccess({ namespace, data: res }));
    });
  };
};
