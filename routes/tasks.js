const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks-controller');

router.route('/')
    .get(tasksController.getTasks)
    .post(tasksController.addTask)

router.route('/:id')
    .get(tasksController.getTask)
    .delete(tasksController.deleteTask)

module.exports = router;