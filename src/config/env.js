const BASEURL = 'http://localhost:9091'; // 接口域名统一前缀

const STOREKEY = 'LEX_REACT_ADMIN'; // 本地储存KEY

const LOGIN_SIGN_TIMEOUT = 'LOGIN_SIGN_TIMEOUT'; // 接口返回CODE: 登录过期
const LOGIN_SIGN_OK = 'OK'; // 接口返回CODE: 登录OK
const LOGIN_SIGN_ERROR = 'ERROR'; // 接口返回CODE: 登录ERROR

const AUTHORITYOPEN = false; // 是否开启权限 可在开发阶段上使用 生产环境根据实际情况使用
const UNITAUTHORITYOPEN = false; // 是否开启最小单元权限

export {
  BASEURL,
  STOREKEY,
  LOGIN_SIGN_TIMEOUT,
  LOGIN_SIGN_OK,
  LOGIN_SIGN_ERROR,
  AUTHORITYOPEN,
  UNITAUTHORITYOPEN
};
