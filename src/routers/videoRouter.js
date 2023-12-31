import express from "express";
import { protectPrivate, uploadVideo, allowPublic } from "../middlewares";
import {
  play,
  getEdit,
  postEdit,
  postUpload,
  getUpload,
  getDeleteVideo,
  // postDeleteVideo,
} from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.route("/:id([0-9a-z]{24})").get(play);
videoRouter
  .route("/:id([0-9a-z]{24})/edit")
  .all(protectPrivate)
  .post(postEdit)
  .get(getEdit);
videoRouter
  .route("/:id([0-9a-z]{24})/delete")
  .all(protectPrivate)
  .get(getDeleteVideo);
videoRouter
  .route("/upload")
  .all(protectPrivate)
  .get(getUpload)
  .post(uploadVideo.single("video"), postUpload);
videoRouter.use("/uploads/video", express.static("uploads/video"));
export default videoRouter;
