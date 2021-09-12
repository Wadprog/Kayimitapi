const express = require('express');
const currency = require('../controllers/currencies');

const router = express.Router();

router.route('/').get(currency.getAll);
module.exports = router;
