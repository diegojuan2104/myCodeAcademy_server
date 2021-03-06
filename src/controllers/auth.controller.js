const db = require("../config/database");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

exports.authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Find the user!
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: "This user doesn't exists" });
    }

    //Check the password
    const passwordIsCorrect = await bcryptjs.compare(password, user.password);
    if (!passwordIsCorrect) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    
    //Sign JWT
    const payload = {
      user: {
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) throw error;
        return res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error");
  }
};


//Returns authenticated user 
exports.authenticatedUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email : req.user.email }, attributes: {exclude: ['password']} });
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was an error" });
  }
};
