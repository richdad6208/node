import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: Video },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
