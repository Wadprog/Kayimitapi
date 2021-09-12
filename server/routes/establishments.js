const express = require('express');

// Custom dependencies
const establishment = require('../controllers/establishment');
const isSupervisor = require('../middleware/isSupervisor');

const router = express.Router();

router
  .route('/')
  .get(establishment.getAll)
  .post(isSupervisor, establishment.createOne)
  .delete(isSupervisor, establishment.deleteOne)
  .put(isSupervisor, establishment.editOne);

module.exports = router;
