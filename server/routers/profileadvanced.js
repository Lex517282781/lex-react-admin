const express = require('express');
const router = express.Router();

router.get(`/advancedData`, function(req, res) {
  res.json({
    data: require(`../mock/profileadvanced/advancedData`),
    success: true
  });
});

module.exports = router;
