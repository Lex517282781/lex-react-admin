const express = require('express');
const user = require('../mock/common/user');

const router = express.Router();

router.post('/login', function(req, res) {
  res.json({
    success: true,
    msg: '',
    data: user
  });
});

module.exports = router;
