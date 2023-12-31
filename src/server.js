import express from "express";
import rootRouter from "./routers/rootRouter";
import apiRouter from "./routers/apiRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import flash from "express-flash";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localMiddleWare } from "./middlewares";
const app = express();

app.use(flash());
app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(morgan("dev"));
app.use(express.static("src"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(localMiddleWare);
app.use("/assets", express.static("assets"));
app.use("/", rootRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);

export default app;
