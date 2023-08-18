import express from "express";
const apiRouter = express.Router();
import { postComment } from "../controllers/videoController";

apiRouter.post("/video/:id([a-z0-9]{24})/comment", postComment);

export default apiRouter;
