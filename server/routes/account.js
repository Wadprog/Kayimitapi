const express = require('express');

// Custom dependencies
const account = require('../controllers/account');

const router = express.Router();

router
  .route('/')
  .post(account.createOne)
  .get(account.getAll)
  .put(account.editOne)
  .delete(account.deleteOne);
router.get('/:id', account.getOne);

module.exports = router;
