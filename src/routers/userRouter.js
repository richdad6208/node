import express from "express";
import { protectPrivate, allowPublic } from "../middlewares";
import {
  loginGithubStart,
  loginGithubFinish,
  logout,
  getEdit,
  postEdit,
} from "../controllers/userController";
const userRouter = express.Router();

userRouter.route("/logout").all(protectPrivate).get(logout);
userRouter.route("/edit").all(protectPrivate).get(getEdit).post(postEdit);
userRouter.route("/github/start").all(allowPublic).get(loginGithubStart);
userRouter.route("/github/finish").all(allowPublic).get(loginGithubFinish);

export default userRouter;
