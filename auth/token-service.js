const jwt = require("jsonwebtoken");

const secrets = require("../api/secrets");

module.exports = {
  generateToken
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: "1d" // 1 day
  };

  return jwt.sign(payload, secret, options);
}
