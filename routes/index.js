var express = require('express');
var router = express.Router();

/* GET the home page. */
router.get('/', function(req, res, next) {
  res.render('default');
});

module.exports = router;
