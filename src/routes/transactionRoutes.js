const express = require('express');
const ctrl = require('../controller/transactionController');

const auth = require('../middleware/jwtMiddleware');

const validate = require('../middleware/validate');

const {
  createTransactionSchema,
  updateTransactionSchema
} = require('../validators/transactionValidation');

const router = express.Router();

router.get('/', auth, ctrl.getAll);

router.post(
  '/',
  auth,
  validate(createTransactionSchema),
  ctrl.create
);

router.get('/:id', auth, ctrl.findId);

router.patch(
  '/:id',
  auth,
  validate(updateTransactionSchema),
  ctrl.update
);

router.delete('/:id', auth, ctrl.remove);

module.exports = router;