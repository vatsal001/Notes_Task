const { signup, login } = require("../service/User.service");
const { signupSchema } = require("../joivalidation");
const redisData = require("../config/redis");

exports.signup = async (req, res) => {
  try {
    console.log("incoming user data", req.body);
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ msg: error });
    console.log("user data", error);
    await signup(req.body);
    res.status(200).json({ msg: "User created" });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("incomming Data", req.body);
    const { accessToken, refreshToken, userId } = await login(req.body);
    console.log("all Data", accessToken, refreshToken, userId);
    await redisData.set(userId.toString(), refreshToken, {
      EX: 7 * 24 * 60 * 60,
    });
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ msg: "Login successful", userId, accessToken });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

exports.refresh = async (req, res) => {
  const token = req.cookies.refresh_token;
  if (!token) return res.status(401).json({ msg: "Missing refresh token" });

  try {
    const payload = require("jsonwebtoken").verify(
      token,
      process.env.JWT_REFRESH_SECRET
    );
    const stored = await redis.get(payload.userId);
    if (stored !== token) throw new Error();

    const { accessToken, refreshToken } = generateTokens(payload.userId);
    await redis.set(payload.userId, refreshToken, { EX: 7 * 24 * 60 * 60 });
    res
      .cookie("access_token", accessToken, { httpOnly: true })
      .cookie("refresh_token", refreshToken, { httpOnly: true })
      .json({ msg: "Tokens refreshed" });
  } catch {
    res.status(403).json({ msg: "Invalid refresh token" });
  }
};
