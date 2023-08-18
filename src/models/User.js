import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  socialLogin: { type: Boolean, default: false },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  realname: { type: String, required: true },
  address: { type: String },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  comment: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
