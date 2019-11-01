const express = require('express');
const router = express.Router();

router.post(`/set`, function(req, res) {
  res.json({
    success: true
  });
});

module.exports = router;
