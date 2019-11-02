import * as actionCreators from '@/store/actionCreators';
import initDatas from './initData';

const { stateFetch } = actionCreators;

export const initializeData = () => {
  return dispatch => {
    initDatas.forEach(item => {
      dispatch(
        actionCreators[item.action]({
          namespace: `profilebasic/${item.name}`,
          data: item.init
        })
      );
    });
  };
};

export const basicDataUpdate = () => {
  return stateFetch({
    namespace: `profilebasic/basicData`,
    api: `profilebasicBasicData`
  });
};
