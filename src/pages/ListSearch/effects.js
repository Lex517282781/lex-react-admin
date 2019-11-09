import * as actionCreators from '@/store/actionCreators';
import initDatas from './initData';

const { stateUpdate, stateFetch } = actionCreators;

export const initializeData = () => {
  return dispatch => {
    initDatas.forEach(item => {
      dispatch(
        actionCreators[item.action]({
          namespace: `listsearch/${item.name}`,
          data: item.init
        })
      );
    });
  };
};

export const tableDataUpdate = () => {
  return stateFetch({
    namespace: `listsearch/tableData`,
    api: `listsearchTableData`
  });
};

export const createFormUpdate = data => {
  return stateUpdate({
    namespace: `listsearch/createForm`,
    data
  });
};

export const tableDataDelete = data => {
  return dispatch => {
    dispatch(
      stateFetch({
        namespace: `listsearch/deleteBtn`,
        api: `listsearchDelete`,
        data
      })
    ).then(() => {
      dispatch(tableDataUpdate());
      dispatch(
        stateUpdate({
          namespace: 'listsearch/selectedRows',
          data: []
        })
      );
    });
  };
};
