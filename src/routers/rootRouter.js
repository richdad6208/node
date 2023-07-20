import express from "express";
import { home, search } from "../controllers/videoController";
import { protectPrivate, allowPublic } from "../middlewares";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
const rootRouter = express.Router();

rootRouter.get("", home);
rootRouter.get("/search", search);
rootRouter.route("/join").all(allowPublic).get(getJoin).post(postJoin);
rootRouter.route("/login").all(allowPublic).get(getLogin).post(postLogin);

export default rootRouter;
