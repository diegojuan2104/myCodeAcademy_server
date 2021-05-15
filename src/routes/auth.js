const { Router } = require("express");
const router = Router();
const { authUser, authenticatedUser } = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");

router.post(
  "/",
  authUser
);

router.get(
  "/",
  auth,
  authenticatedUser
)

module.exports = router;
