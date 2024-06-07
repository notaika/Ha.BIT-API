const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits-controller');
const { authorize } = require('../controllers/users-controller')

router.route('/')
    .get(authorize, habitsController.getHabits)
    .post(authorize, habitsController.postHabit)

router.route('/:id')
    .delete(authorize, habitsController.deleteHabit)

router.route('/completed')
    .post(authorize, habitsController.postCompleted)
    .get(authorize, habitsController.getHabitCompletionLogs)
module.exports = router;