import express from "express";
import { protectPrivate, allowPublic, uploadAvatar } from "../middlewares";
import {
  loginGithubStart,
  loginGithubFinish,
  logout,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
  profile,
  deleteComment,
} from "../controllers/userController";
const userRouter = express.Router();

userRouter.route("/logout").all(protectPrivate).get(logout);
userRouter
  .route("/edit")
  .all(protectPrivate)
  .get(getEdit)
  .post(uploadAvatar.single("avatar"), postEdit);
userRouter
  .route("/changePassword")
  .all(protectPrivate)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.route("/github/start").all(allowPublic).get(loginGithubStart);
userRouter.route("/github/finish").all(allowPublic).get(loginGithubFinish);
userRouter.use("/uploads/avatar", express.static("uploads/avatar"));
userRouter.route("/profile/:id").get(profile);
userRouter
  .route("/:id([0-9a-z]{24})/:commentId([0-9a-z]{24})/delete")
  .delete(deleteComment);

export default userRouter;
