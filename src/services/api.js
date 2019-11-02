const Api = [
  {
    fn: 'login',
    url: '/user/login',
    method: 'post'
  },
  {
    fn: 'logout',
    url: '/user/logout',
    method: 'post'
  },
  // Dashboardanalysis
  {
    fn: 'getDashboardanalysisvisitData',
    url: '/dashboardanalysis/visitData'
  },
  {
    fn: 'getDashboardanalysisvisitData2',
    url: '/dashboardanalysis/visitData2'
  },
  {
    fn: 'getDashboardanalysissalesData',
    url: '/dashboardanalysis/salesData'
  },
  {
    fn: 'getDashboardanalysissearchData',
    url: '/dashboardanalysis/searchData'
  },
  {
    fn: 'getDashboardanalysisofflineData',
    url: '/dashboardanalysis/offlineData'
  },
  {
    fn: 'getDashboardanalysisofflineChartData',
    url: '/dashboardanalysis/offlineChartData'
  },
  {
    fn: 'getDashboardanalysissalesTypeData',
    url: '/dashboardanalysis/salesTypeData'
  },
  {
    fn: 'getDashboardanalysissalesTypeDataOnline',
    url: '/dashboardanalysis/salesTypeDataOnline'
  },
  {
    fn: 'getDashboardanalysissalesTypeDataOffline',
    url: '/dashboardanalysis/salesTypeDataOffline'
  },
  // DashboardWorkplace
  {
    fn: 'getDashboardworkplaceproject',
    url: '/dashboardworkplace/project'
  },
  {
    fn: 'getDashboardworkplaceactivities',
    url: '/dashboardworkplace/activities'
  },
  {
    fn: 'getDashboardworkplaceradarData',
    url: '/dashboardworkplace/radarData'
  },
  // DashboardMonitor
  {
    fn: 'getDashboardmonitortags',
    url: '/dashboardmonitor/tags'
  },
  // FormBasic
  {
    fn: 'formbasicSet',
    url: '/formbasic/set',
    method: 'post'
  },
  // ListSearch
  {
    fn: 'listsearchTableData',
    url: '/listsearch/tableData'
  },
  {
    fn: 'listsearchDelete',
    url: '/listsearch/delete',
    method: 'post'
  },
  // Listbasic
  {
    fn: 'listbasicTableData',
    url: '/listbasic/tableData'
  },
  // ListCard
  {
    fn: 'listcardTableData',
    url: '/listcard/tableData'
  },
  // ListArticles
  {
    fn: 'listarticlesTableData',
    url: '/listarticles/tableData'
  },
  // ListProjects
  {
    fn: 'listprojectsTableData',
    url: '/listprojects/tableData'
  },
  // ListApplications
  {
    fn: 'listapplicationsTableData',
    url: '/listapplications/tableData'
  }
];

export default Api;
