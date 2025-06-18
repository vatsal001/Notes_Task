const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(req.cookies);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, "abcdefgh12345");
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token", err });
  }
};
