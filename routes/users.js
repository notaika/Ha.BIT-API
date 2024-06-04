const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');

router.route('/')
    .get(usersController.getUsers);

router.route('/:id')
    .get(usersController.getUser)
    
router.route('/:id/coins')
    .patch(usersController.addCoins)

router.route('/:id/reputation')
    .patch(usersController.addReputation)

module.exports = router;