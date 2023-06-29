import mongoose from "mongoose";

const VideoSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true, required: true }],
  meta: {
    view: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

VideoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((item) => (item.startsWith("#") ? item : `#${item}`));
});

// VideoSchema.pre("save", async function () {
//   this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((item) => (item.startsWith("#") ? item : `#${item}`));
//   console.log(this);
// });

const Video = mongoose.model("Video", VideoSchema);

export default Video;
