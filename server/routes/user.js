const express = require('express');

// Custom dependencies
const user = require('../controllers/user');
const isSuperVisor = require('../middleware/isSupervisor');

const router = express.Router();
router.use(isSuperVisor);

router.route('/').post(user.createOne).get(user.getAll);
router.get('/:id', user.getOne);
router.get('/:id/edit', user.editOne);
router.put('/lock/:id', user.lockOne);
router.put('/level/:id', user.makeSuper);

module.exports = router;
