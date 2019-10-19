// import * as types from './types';

const initState = {
  payAccount: 'ant-design@alipay.com',
  receiverAccount: 'test@example.com',
  receiverName: 'Alex',
  amount: '500',
  loading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
