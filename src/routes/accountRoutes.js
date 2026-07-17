const express = require('express');
const ctrl = require('../controller/accountController');

const auth = require('../middleware/jwtMiddleware');

const validate = require('../middleware/validate');

const {
  createAccountSchema,
  updateAccountSchema
} = require('../validators/accountValidation');

const router = express.Router();

router.get('/', auth, ctrl.getAll);

router.post(
  '/',
  auth,
  validate(createAccountSchema),
  ctrl.create
);

router.get('/:id', auth, ctrl.findId);

router.patch(
  '/:id',
  auth,
  validate(updateAccountSchema),
  ctrl.update
);

router.delete('/:id', auth, ctrl.remove);

module.exports = router;