const express = require('express');
const isSupervisor = require('../middleware/isSupervisor');
const IsEstablishmentAccessible = require('../middleware/IsEstablishmentAccessible');
const ifCreatorOrSuperVisor = require('../middleware/transaction');

// Custom dependencies
const transaction = require('../controllers/transaction');

const router = express.Router();

router
  .route('/')
  .post(IsEstablishmentAccessible, transaction.createOne)
  .get(IsEstablishmentAccessible, transaction.getAll)
  .put(isSupervisor, transaction.editMany);

router.delete('/:id', ifCreatorOrSuperVisor, transaction.deleteOne);
// router.get('/:id/edit', user.editOne);

module.exports = router;
