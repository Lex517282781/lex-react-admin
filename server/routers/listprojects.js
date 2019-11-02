const express = require('express');
const router = express.Router();

router.get(`/tableData`, function(req, res) {
  res.json({
    data: require(`../mock/listprojects/tableData`),
    success: true
  });
});

module.exports = router;
