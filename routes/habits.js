const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits-controller');

router.route('/')
    .get(habitsController.getHabits)

router.route('/:id')
    .get(habitsController.getHabit)

module.exports = router;