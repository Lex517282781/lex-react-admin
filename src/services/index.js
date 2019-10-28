import ajax from './ajax';
import Api from './api';

const Service = {};

Api.forEach(
  ({ fn, url, method = 'get', headers = {}, cash = false, direct = false }) => {
    // fn 在导出Service之后实际写的方法
    // url 后端请求接口
    // method 为请求方式
    // headers 为请求headers
    // cash为true 加时间戳
    // direct 在url地址之后直接加参数aimid方式请求接口
    // urlQuery 可能请求接口是其他情况下 或者需要动态数据请求接口下 如: `/pc/account/${id}`的情况下 只是做个举例
    Service[fn] = ({
      data, // method为post的情况下使用data
      params, // method为get的情况下使用params
      waitting, // 自定义加载状态
      error, // 错误状态
      aimid = '',
      query, // method为get的情况下使用query query一般为复杂数据下使用 如 query: { ids: [1, 2, 3] }
      urlQuery, // 自定义url或者动态url
      isNeedEmpty // 是否允许空数据上传
    } = {}) => {
      let urlData = url;
      if (direct) urlData = url + '/' + aimid;
      if (urlQuery) urlData = urlQuery;
      if (query) {
        // 对链接上面的查询参数做拼接处理
        Object.keys(query).forEach(k => {
          if (Object.prototype.toString.call(query[k]) === '[object Array]') {
            urlData =
              url +
              '?' +
              query[k].reduce((sum, item, i) => {
                if (i === query[k].length - 1) {
                  return sum + k + '=' + item;
                } else {
                  return sum + k + '=' + item + '&';
                }
              }, '');
          }
        });
      }

      return ajax({
        url: urlData,
        method,
        headers,
        data,
        params,
        waitting,
        error,
        cash,
        isNeedEmpty
      });
    };
  }
);

export default Service;
