export const notices = [];

export const articles = {
  list: [],
  pagination: { total: 0, pageSize: 10, current: 1 },
  query: {}
};

export const applications = {
  list: [],
  pagination: { total: 0, pageSize: 10, current: 1 },
  query: {}
};

export const projects = {
  list: [],
  pagination: { total: 0, pageSize: 10, current: 1 },
  query: {}
};

export default [
  {
    name: 'notices',
    init: notices,
    action: 'stateSuccess'
  },
  {
    name: 'articles',
    init: articles,
    action: 'stateSuccess'
  },
  {
    name: 'applications',
    init: applications,
    action: 'stateSuccess'
  },
  {
    name: 'projects',
    init: projects,
    action: 'stateSuccess'
  }
];
