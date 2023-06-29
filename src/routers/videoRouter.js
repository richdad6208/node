import express from "express";
import {
  play,
  getEdit,
  postEdit,
  postUpload,
  getUpload,
  deleteVideo,
} from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.route("/:id([0-9a-z]{24})").get(play);
videoRouter.route("/:id([0-9a-z]{24})/edit").post(postEdit).get(getEdit);
videoRouter.route("/:id([0-9a-z]{24})/delete").get(deleteVideo);
videoRouter.route("/upload").post(postUpload).get(getUpload);

export default videoRouter;
