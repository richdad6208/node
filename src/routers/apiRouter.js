import express from "express";
const apiRouter = express.Router();
import { postComment } from "../controllers/videoController";
import { deleteComment } from "../controllers/userController";
apiRouter.post("/video/:id([a-z0-9]{24})/comment", postComment);
apiRouter
  .route("/video/:id([0-9a-z]{24})/:commentId([0-9a-z]{24})/delete")
  .delete(deleteComment);

export default apiRouter;
