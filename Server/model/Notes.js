const { string } = require("joi");
const mongooseSchema = require("mongoose");

const createNoteSchema = new mongooseSchema.Schema(
  {
    user: { type: mongooseSchema.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongooseSchema.model("Notes", createNoteSchema);
