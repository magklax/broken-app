const jwt = require("jsonwebtoken");
const User = require("../db").import("../models/user");

module.exports = function (req, res, next) {
  if (req.method == "OPTIONS") {
    next();
  } else {
    const sessionToken = req.headers.authorization;
    if (!sessionToken)
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });
    else {
      jwt.verify(
        sessionToken,
        "lets_play_sum_games_man",
        async (err, decoded) => {
          if (err) {
            res.status(400).send({ message: "not authorized", error: err });
          }

          if (decoded) {
            try {
              const user = await User.findOne({ where: { id: decoded.id } });
              req.user = user;
              console.log(`user: ${user.username}`);
              next();
            } catch (error) {
              res.status(401).send({
                message: "not authorized",
                error: error,
              });
            }
          }
        }
      );
    }
  }
};
