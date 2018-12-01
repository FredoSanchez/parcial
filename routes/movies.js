var express = require('express');
var router = express.Router();


/* GET users listing. */
//Read all
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//Read One
router.get('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

//Create
router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});

//Update
router.put('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

//Delete
router.get('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;