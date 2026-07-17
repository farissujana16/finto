const express = require('express');
const ctrl = require('../controller/categoriesController');

const auth = require('../middleware/jwtMiddleware');

const validate = require('../middleware/validate');

const {
  createCategoriesSchema,
  updateCategoriesSchema
} = require('../validators/categoriesValidation');

const router = express.Router();

router.get('/', auth, ctrl.getAll);

router.post(
  '/',
  auth,
  validate(createCategoriesSchema),
  ctrl.create
);

router.get('/:id', auth, ctrl.findId);

router.patch(
  '/:id',
  auth,
  validate(updateCategoriesSchema),
  ctrl.update
);

router.delete('/:id', auth, ctrl.remove);

module.exports = router;