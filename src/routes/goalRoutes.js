const express = require('express');
const ctrl = require('../controller/goalController');

const auth = require('../middleware/jwtMiddleware');

const validate = require('../middleware/validate');

const {
  createGoalSchema,
  updateGoalSchema
} = require('../validators/goalValidation');

const router = express.Router();

router.get('/', auth, ctrl.getAll);

router.post(
  '/',
  auth,
  validate(createGoalSchema),
  ctrl.create
);

router.get('/:id', auth, ctrl.findId);

router.patch(
  '/:id',
  auth,
  validate(updateGoalSchema),
  ctrl.update
);

router.delete('/:id', auth, ctrl.remove);

module.exports = router;