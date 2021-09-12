const express = require('express');

// Custom dependencies
const rate = require('../controllers/rate');
const isSuperVisor = require('../middleware/isSupervisor');

const router = express.Router();

router
  .route('/')
  .get(rate.getAll)
  .post(isSuperVisor, rate.createOne)
  .put(isSuperVisor, rate.editOne);
  
module.exports = router;
