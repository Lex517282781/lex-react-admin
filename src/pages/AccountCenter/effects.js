import * as actionCreators from '@/store/actionCreators';
import initDatas from './initData';

const { stateFetch } = actionCreators;

export const initializeData = () => {
  return dispatch => {
    initDatas.forEach(item => {
      dispatch(
        actionCreators[item.action]({
          namespace: `accountcenter/${item.name}`,
          data: item.init
        })
      );
    });
  };
};

export const noticesUpdate = () => {
  return stateFetch({
    namespace: `accountcenter/notices`,
    api: `getUserNotices`
  });
};

export const articlesDataUpdate = () => {
  return stateFetch({
    namespace: `accountcenter/articles`,
    api: `listapplicationsTableData`
  });
};

export const applicationsDataUpdate = () => {
  return stateFetch({
    namespace: `accountcenter/applications`,
    api: `listapplicationsTableData`
  });
};

export const projectsDataUpdate = () => {
  return stateFetch({
    namespace: `accountcenter/projects`,
    api: `listapplicationsTableData`
  });
};
