import * as actionCreators from '@/store/actionCreators';
import initDatas from './initData';

const { stateFetch } = actionCreators;

export const initializeData = () => {
  return dispatch => {
    initDatas.forEach(item => {
      dispatch(
        actionCreators[item.action]({
          namespace: `listprojects/${item.name}`,
          data: item.init
        })
      );
    });
  };
};

export const tableDataUpdate = () => {
  return stateFetch({
    namespace: `listprojects/tableData`,
    api: `listprojectsTableData`
  });
};
