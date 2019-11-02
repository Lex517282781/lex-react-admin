import * as actionCreators from '@/store/actionCreators';
import initDatas from './initData';

const { stateFetch } = actionCreators;

export const initializeData = () => {
  return dispatch => {
    initDatas.forEach(item => {
      dispatch(
        actionCreators[item.action]({
          namespace: `profileadvanced/${item.name}`,
          data: item.init
        })
      );
    });
  };
};

export const advancedDataUpdate = () => {
  return stateFetch({
    namespace: `profileadvanced/advancedData`,
    api: `profileadvancedAdvancedData`
  });
};
