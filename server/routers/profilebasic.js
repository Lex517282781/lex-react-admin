const express = require('express');
const router = express.Router();

router.get(`/basicData`, function(req, res) {
  res.json({
    data: require(`../mock/profilebasic/basicData`),
    success: true
  });
});

module.exports = router;
