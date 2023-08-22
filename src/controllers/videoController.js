import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "HOME", videos });
  } catch (error) {
    console.log("we got problem", { error });
  }
};
export const play = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id)
      .populate("owner")
      .populate("comments");
    if (!video) {
      return res.status(404).render("404");
    } else {
      return res.render("play", {
        pageTitle: "PLAY VIDEO",
        video,
        id,
      });
    }
  } catch {
    return res.redirect("home", { pageTitle: "home" });
  }
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const { file } = req;
  const { _id } = req.session.user;
  const { title, description, hashtags } = req.body;
  const newVideo = await Video.create({
    title,
    videoUrl: file
      ? res.locals.isHeroku
        ? file.location
        : file.path
      : undefined,
    description,
    hashtags: Video.formatHashtags(hashtags),
    owner: _id,
  });
  const user = await User.findById(_id);
  user.videos.push(newVideo._id);
  user.save();
  res.redirect("/");
};

export const getEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user: { _id },
    } = req.session;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).render("404");
    }
    if (String(video.owner) !== String(_id)) {
      return res.status(403).redirect("/");
    }
    return res.render("edit", { pageTitle: `edit: ${video.title}`, video });
  } catch (error) {
    console.log(error);
    return res.redirect("home");
  }
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = Video.exists({ _id: id });
  if (!video) {
    return res.render("404");
  } else {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/video/${id}`);
  }
};
export const getDeleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.status(404).redirect("/");
  }
  if (String(video.owner._id) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  var user = await User.findById(video.owner._id);
  var deleteVideoIndex = user.videos.indexOf(video._id);
  console.log(user);
  if (deleteVideoIndex !== -1) {
    user.videos.splice(deleteVideoIndex, 1);
    user.save();
  }
  console.log(deleteVideoIndex);
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}`, "i"),
      },
    });
    res.render("search", { pageTitle: `keyword search: ${keyword}`, videos });
  }
  res.render("search", { pageTitle: "search", videos });
};

export const postComment = async (req, res) => {
  const {
    params: { id },
    session: { user },
    body: { text },
  } = req;

  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }

  const comment = await Comment.create({
    text,
    user: user._id,
    video: id,
  });

  video.comments.push(comment._id);
  await video.save();

  const commentedUser = await User.findById(user._id);
  if (commentedUser) {
    commentedUser.comments.push(comment._id);
    commentedUser.save();
  }

  return res.sendStatus(201);
};
