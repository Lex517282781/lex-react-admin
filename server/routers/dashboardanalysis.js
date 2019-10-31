const express = require('express');
const router = express.Router();

[
  'visitData',
  'visitData2',
  'salesData',
  'searchData',
  'offlineData',
  'offlineChartData',
  'salesTypeData',
  'salesTypeDataOnline',
  'salesTypeDataOffline'
].forEach(path => {
  router.get(`/${path}`, function(req, res) {
    res.json({
      data: require(`../mock/dashboardanalysis/${path}`),
      success: true
    });
  });
});

module.exports = router;
