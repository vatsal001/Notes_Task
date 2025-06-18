const jsonwebtoken = require("jsonwebtoken");

exports.generateTokens = (userId) => {
  const accessToken = jsonwebtoken.sign({ userId }, "abcdefgh12345", {
    expiresIn: "20m",
  });

  const refreshToken = jsonwebtoken.sign({ userId }, "pqrstuvw12345", {
    expiresIn: "7d",
  });
  console.log(accessToken, refreshToken);
  return {
    accessToken,
    refreshToken,
  };
};
