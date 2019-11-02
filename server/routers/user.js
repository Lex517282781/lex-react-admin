const express = require('express');
const user = require('../mock/common/user');
const notices = require('../mock/common/notices');

const router = express.Router();

router.post('/login', function(req, res) {
  res.json({
    success: true,
    msg: '',
    data: user
  });
});

router.get('/notices', function(req, res) {
  res.json({
    success: true,
    msg: '',
    data: notices
  });
});

module.exports = router;
