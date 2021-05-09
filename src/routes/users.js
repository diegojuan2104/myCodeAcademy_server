const { Router } = require("express");
const router = Router();
const { addUser } = require("../controllers/user.controller");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("username", "Username must be entered").not().isEmpty(),
    check("email", "Email must be valid").isEmail(),
    check("password", "Username must have at least 6 characteres").isLength({
      min: 6,
    }),
  ],
  addUser
);

module.exports = router;
