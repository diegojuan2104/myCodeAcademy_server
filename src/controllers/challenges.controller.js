const Challenge = require("../models/Challenge");
const ChallengeSubmission = require("../models/ChallengeSubmission");
const { validationResult } = require("express-validator");

exports.addChallenge = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await Challenge.create(req.body);
    res.status(200).send("Challenge created");
  } catch (error) {
    console.log(error);
    res.status(400).send("There was an error");
  }
};


exports.getAllChallenges = async (req, res) => {
    try {
      const challenges = await Challenge.findAll({
        attributes: {exclude: ['output', 'text', 'input']},
        order: [['id','ASC']]});
      res.json({ challenges });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "There was an error" });
    }
};

exports.getChallengeById = async (req, res) => {
  try {
    console.log(req.params.id);
    const challenge = await Challenge.findOne({ where: { id : req.params.id }, attributes: {exclude: ['output']} });
    res.json({ challenge });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was an error" });
  }
};

exports.submitChallenge = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //Validate if the answer id correct

    await ChallengeSubmission.create(req.body);
    res.status(200).send("Challenge submited");
  } catch (error) {
    console.log(error);
    res.status(400).send("There was an error");
  }
};
  
