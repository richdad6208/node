import Video from "../models/Video";

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
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).render("404");
    } else return res.render("play", { pageTitle: "PLAY VIDEO", video, id });
  } catch {
    return res.redirect("home", { pageTitle: "home" });
  }
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    res.redirect("/");
  } catch (error) {
    console.log(error._message);
    return res.render("upload", {
      pageTitle: "upload",
      errorMessage: error._message,
    });
  }
};

export const getEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).render("404");
    } else {
      return res.render("edit", { pageTitle: `edit: ${video.title}`, video });
    }
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

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  if (!(await Video.exists({ _id: id }))) {
    return res.status(404).render("404");
  } else {
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
  }
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
