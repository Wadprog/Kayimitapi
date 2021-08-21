const express = require('express');

// Custom dependencies
const transaction = require('../controllers/transaction');

const router = express.Router();

router.route('/').post(transaction.createOne).get(transaction.getAll);

// router.get('/:id', user.getOne);
// router.get('/:id/edit', user.editOne);

module.exports = router;
