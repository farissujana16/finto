const express = require('express');
const ctrl = require('../controller/budgetController');

const auth = require('../middleware/jwtMiddleware');

const validate = require('../middleware/validate');

const {
  createBudgetSchema,
  updateBudgetSchema
} = require('../validators/budgetValidation');

const router = express.Router();

router.get('/', auth, ctrl.getAll);

router.post(
  '/',
  auth,
  validate(createBudgetSchema),
  ctrl.create
);

router.get('/:id', auth, ctrl.findId);

router.patch(
  '/:id',
  auth,
  validate(updateBudgetSchema),
  ctrl.update
);

router.delete('/:id', auth, ctrl.remove);

module.exports = router;