import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  socialLogin: { type: Boolean, default: false },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  realname: { type: String, required: true },
  address: { type: String },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
