const db = require("../config/database");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

exports.addUser = async (req, res) => {
  //Error checking
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, photo_url, description } = req.body;

  try {
    //Check if the user already exist!

    //Email validation
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res
        .status(400)
        .json({ msg: "The user with this email already exists!" });
    } else {
      //Username validation
      user = await User.findOne({ where: { username } });
      if (user) {
        return res
          .status(400)
          .json({ msg: "The user with this username already exists!" });
      }
    }

    //Create the new user
    user = { username, email, password, photo_url, description };

    //Password encryption
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    
    //Save the new user
    await User.create(user);

    //Sign JWT
    const payload = {
      user: {
        email: user.email,
      },
    };

    //Firmar el jwt
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
    res.status(400).send("There was an error");
  }
};
