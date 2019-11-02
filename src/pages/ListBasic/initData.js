export const tableData = {
  list: [],
  pagination: { total: 0, pageSize: 10, current: 1 },
  query: {}
};

export const updateForm = {
  visible: false,
  done: false
};

export default [
  {
    name: 'tableData',
    init: tableData,
    action: 'stateSuccess'
  },
  {
    name: 'updateForm',
    init: updateForm,
    action: 'stateUpdate'
  }
];
