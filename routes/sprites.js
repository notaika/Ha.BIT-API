const express = require('express');
const router = express.Router();
const spritesController = require('../controllers/sprites.controller');

router.route('/')
    .get(spritesController.getSprites)
    .patch(spritesController.editCost)

router.route('/:id')
    
module.exports = router;