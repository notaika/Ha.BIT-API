const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');

router.route('/')
    .get(usersController.getUsers)

router.route('/signup')
    .post(usersController.userSignup)

router.route('/login')
    .post(usersController.userLogin)

router.route('/profile')
    .get(usersController.authorize, usersController.getProfile)

router.route('/:id')
    .get(usersController.getUser)
    
router.route('/:id/coins/add')
    .patch(usersController.addCoins)

router.route('/:id/reputation')
    .patch(usersController.addReputation)

module.exports = router;