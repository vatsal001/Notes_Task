const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { generateTokens } = require("../jsonwebtocken");

exports.signup = async ({ username, password }) => {
  if (await User.exists({ username })) throw new Error("User already exists");
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  return { msg: "User has created" };
};

exports.login = async ({ username, password }) => {
  try {
    const user = await User.findOne({ username });
    console.log(user, "user login");
    if (!user) throw new Error("Invalid credentials");
    if (!(await bcrypt.compare(password, user.password)))
      throw new Error("Invalid credentials");

    const { accessToken, refreshToken } = generateTokens(user._id);
    return { accessToken, refreshToken, userId: user._id };
  } catch (error) {
    console.log(error);
    return error;
  }
};
