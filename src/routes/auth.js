const { Router } = require("express");
const router = Router();
const { authUser } = require("../controllers/auth.controller");


router.post(
  "/",
  authUser
);

module.exports = router;
