const express = require('express');
const province = require('../mock/common/province');
const city = require('../mock/common/city');

const router = express.Router();

router.get('/province', function(req, res) {
  res.json({
    success: true,
    msg: '',
    data: province
  });
});

router.get('/city', function(req, res) {
  res.json({
    success: true,
    msg: '',
    data: city
  });
});

module.exports = router;
