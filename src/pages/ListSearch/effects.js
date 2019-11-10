import * as actionCreators from '@/store/actionCreators';
import initDatas from './initData';

const { stateUpdate, stateFetch } = actionCreators;

// 初始化数据
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

// 新建模态框
export const createFormUpdate = data => {
  return stateUpdate({
    namespace: `listsearch/createForm`,
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

// 更新当前对象
export const currentUpdate = data => {
  return stateUpdate({
    namespace: `listsearch/current`,
    data
  });
};

export const selectedRowsUpdate = data => {
  return stateUpdate({
    namespace: `listsearch/selectedRows`,
    data
  });
};

// table数据获取
export const tableDataUpdate = () => {
  return stateFetch({
    namespace: `listsearch/tableData`,
    api: `listsearchTableData`
  });
};

// 表格行数据删除
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
