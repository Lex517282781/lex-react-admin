const express = require('express');
const router = express.Router();

router.get(`/tableData`, function(req, res) {
  res.json({
    data: require(`../mock/listsearch/tableData`),
    success: true
  });
});

router.post(`/delete`, function(req, res) {
  res.json({
    success: true,
    msg: ''
  });
});

module.exports = router;
