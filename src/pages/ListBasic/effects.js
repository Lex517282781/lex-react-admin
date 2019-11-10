import * as actionCreators from '@/store/actionCreators';
import initDatas from './initData';

const { stateUpdate, stateFetch } = actionCreators;

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

// 更新当前对象
export const currentUpdate = data => {
  return stateUpdate({
    namespace: `listsearch/current`,
    data
  });
};


// 更新模态框
export const updateFormUpdate = data => {
  return stateUpdate({
    namespace: `listsearch/updateForm`,
    data
  });
};

// table数据获取
export const tableDataUpdate = () => {
  return stateFetch({
    namespace: `listbasic/tableData`,
    api: `listbasicTableData`
  });
};

// 表格行数据删除
export const tableDataDelete = data => {
  return dispatch => {
    dispatch(
      stateFetch({
        namespace: `listbasic/deleteBtn`,
        api: `listsearchDelete`,
        data
      })
    ).then(() => {
      dispatch(tableDataUpdate());
    });
  };
};
