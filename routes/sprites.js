const express = require('express');
const router = express.Router();
const spritesController = require('../controllers/sprites.controller');
const { authorize } = require('../controllers/users-controller');

router.route('/')
    .get(spritesController.getSprites)

router.route('/user')
    .get(authorize, spritesController.getUserSprites)

router.route('/purchase')
    .post(authorize, spritesController.purchaseSprite)
    
module.exports = router;