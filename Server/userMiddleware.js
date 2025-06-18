const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ msg: 'This User is not Authorized!' });

  try {
    req.user = jwt.verify(token, );
    next();
  } catch {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
