const express = require('express');
const data = require('./db');

const router = express.Router();

router.post('/login', function(req, res) {
  res.json(data);
});

module.exports = router;
