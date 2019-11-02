import * as actionCreators from '@/store/actionCreators';
import initDatas from './initData';

const { stateFetch } = actionCreators;

export const initializeData = () => {
  return dispatch => {
    initDatas.forEach(item => {
      dispatch(
        actionCreators[item.action]({
          namespace: `listbasic/${item.name}`,
          data: item.init
        })
      );
    });
  };
};

export const tableDataUpdate = () => {
  return stateFetch({
    namespace: `listbasic/tableData`,
    api: `listbasicTableData`
  });
};
