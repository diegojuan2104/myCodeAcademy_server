const { Router } = require("express");
const router = Router();
const { addChallenge, getAllChallenges, getChallengeById, submitChallenge } = require("../controllers/challenges.controller");
const { check } = require("express-validator");
const auth = require("../middlewares/auth.middleware");

router.post(
  "/",
  [
    check("title", "Title of the challenge must be entered").not().isEmpty(),
    check("text", "Text of the challenge must be entered").not().isEmpty(),
    check("output", "output of the challenge must be entered").not().isEmpty(),
    check("input", "input of the challenge must be entered").not().isEmpty(),
    check("difficulty", "Name of the challenge must be entered").not().isEmpty(),
  ],
  addChallenge
);

router.post(
  "/submitChallenge",
  [
    check("id", "id of the challenge submission must be entered").not().isEmpty(),
    check("code_solution", "code_solution of challenge submission must be entered").not().isEmpty(),
    check("date", "date of the challenge submission must be entered").not().isEmpty(),
    check("challenge_id", "challenge_id of challenge submission must be entered").not().isEmpty(),
    check("user_email", "user_email of the challenge submission must be entered").not().isEmpty(),
    check("answer", "answer of the challenge must be entered").not().isEmpty(),
  ],
  submitChallenge
);

router.get(
    "/",
    auth,
    getAllChallenges
);

router.get(
  "/:id",
  auth,
  getChallengeById
);
  

module.exports = router;
