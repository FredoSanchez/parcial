var express = require('express');
var router = express.Router();
var MovieController = require('../controllers/MovieController');


/* GET users listing. */
//Read all
router.get('/', MovieController.getAll);
//Read One
router.get('/:id', MovieController.getOne);

//Create
router.post('/', MovieController.insert);

//Update
router.put('/:id', MovieController.update);

//Delete
router.get('/:id', MovieController.delete);

module.exports = router;