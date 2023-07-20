import express from "express";
import { 
  protectPrivate,
  allowPublic,
} from "../middlewares";
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
videoRouter.route("/:id([0-9a-z]{24})/edit").all(protectPrivate).post(postEdit).get(getEdit);
videoRouter.route("/:id([0-9a-z]{24})/delete").all(protectPrivate).get(deleteVideo);
videoRouter.route("/upload").post(postUpload).all(protectPrivate).get(getUpload);

export default videoRouter;
