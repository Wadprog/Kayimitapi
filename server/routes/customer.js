const express = require('express');

// Custom dependencies
const customer = require('../controllers/customer');

const router = express.Router();

router.route('/').post(customer.createOne).get(customer.getAll);

router.post('/edit/:id', customer.editOne);
router.get('/:id', customer.getOne);

module.exports = router;
