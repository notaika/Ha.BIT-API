const express = require('express');
const router = express.Router();
const spritesController = require('../controllers/sprites.controller');

router.route('/')
    .get(spritesController.getSprites)

router.route('/:id')
    .get(spritesController.getSprite);
    
module.exports = router;