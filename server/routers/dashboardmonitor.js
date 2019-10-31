const express = require('express');
const router = express.Router();

['tags'].forEach(path => {
  router.get(`/${path}`, function(req, res) {
    res.json({
      data: require(`../mock/dashboardmonitor/${path}`),
      success: true
    });
  });
});

module.exports = router;
