export const tableData = {
  list: [],
  pagination: { total: 0, pageSize: 10, current: 1 },
  query: {}
};

export default [
  {
    name: 'tableData',
    init: tableData,
    action: 'stateSuccess'
  }
];
