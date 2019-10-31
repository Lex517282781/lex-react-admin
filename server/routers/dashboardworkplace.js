const express = require('express');
const router = express.Router();

['activities', 'project', 'radarData'].forEach(path => {
  router.get(`/${path}`, function(req, res) {
    res.json({
      data: require(`../mock/dashboardworkplace/${path}`),
      success: true
    });
  });
});

module.exports = router;
