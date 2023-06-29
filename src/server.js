import express from "express";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import morgan from "morgan";
const app = express();

app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(morgan("dev"));
app.use(express.static("src"));
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/video", videoRouter);

export default app;
