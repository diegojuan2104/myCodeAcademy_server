const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Read the token from the header 
  const token = req.header("x-auth-token");

  //Check if the token exists 
  if (!token) {
    return res.status(401).json({ msg: "There is not token!" });
  }

  //Validate the token 
  try {
    const encryption = jwt.verify(token, process.env.SECRET_KEY);
    req.user = encryption.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido" });
  }
};
