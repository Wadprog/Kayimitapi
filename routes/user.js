const express = require('express');

// Custom dependencies
const user = require('../controllers/user');

const router = express.Router();

router.route('/').post(user.createOne).get(user.getAll);
router.get('/:id', user.getOne);
router.get('/:id/edit', user.editOne);

module.exports = router;
