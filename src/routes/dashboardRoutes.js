const express = require("express");
const ctrl = require("../controller/dashboardController");

const auth = require("../middleware/jwtMiddleware");

const validate = require("../middleware/validate");

const {
  createDashboardSchema,
  updateDashboardSchema,
} = require("../validators/dashboardValidation");

const router = express.Router();

router.get("/", auth, ctrl.getAll);

// router.post(
//   '/',
//   auth,
//   validate(createDashboardSchema),
//   ctrl.create
// );

// router.get('/:id', auth, ctrl.findId);

// router.patch(
//   '/:id',
//   auth,
//   validate(updateDashboardSchema),
//   ctrl.update
// );

// router.delete("/:id", auth, ctrl.remove);

module.exports = router;
