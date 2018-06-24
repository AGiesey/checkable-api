var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  //var test = req.query.test;
  res.send('test')
});

router.post('/getById', function(req, res){
  var params = req.params.test;
  res.send(params)
})

module.exports = router;
