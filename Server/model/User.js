const { string } = require("joi");
const mongooseSchema = require("mongoose");

const createUserSchema = new mongooseSchema.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const mongooseUserModel = mongooseSchema.model('User', createUserSchema)
module.exports = mongooseUserModel;
