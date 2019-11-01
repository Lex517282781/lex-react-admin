export const tableData = {
  list: [],
  pagination: { total: 0, pageSize: 10, current: 1 },
  query: {}
};

export const createForm = {
  visible: false
};

export const updateForm = {
  visible: false
};

export const selectedRows = [];

export const expandForm = [];

export const current = null;

export default [
  {
    name: 'tableData',
    init: tableData,
    action: 'stateSuccess'
  },
  {
    name: 'createForm',
    init: createForm,
    action: 'stateUpdate'
  },
  {
    name: 'updateForm',
    init: updateForm,
    action: 'stateUpdate'
  },
  {
    name: 'selectedRows',
    init: selectedRows,
    action: 'stateUpdate'
  },
  {
    name: 'expandForm',
    init: expandForm,
    action: 'stateUpdate'
  },
  {
    name: 'current',
    init: current,
    action: 'stateUpdate'
  }
];
