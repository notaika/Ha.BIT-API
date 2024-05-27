const express = require('express');
const router = express.Router();
const levelsController = require('../controllers/levels-controller');

router.route('/')
    .get(levelsController.getLevels)

module.exports = router;