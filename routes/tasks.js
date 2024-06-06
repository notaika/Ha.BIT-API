const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks-controller');
const userController = require('../controllers/users-controller');

router.route('/')
    .get(userController.authorize, tasksController.getTasks)
    .post(tasksController.addTask)

router.route('/:id')
    .get(tasksController.getTask)
    .delete(tasksController.deleteTask)

module.exports = router;