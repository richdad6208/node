import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
const isHeroku = process.env.NODE_ENV === "production";

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
  region: "ap-northeast-2",
});
const herokuUploadImage = multerS3({
  s3: s3,
  bucket: "richdad6208node",
  acl: "public-read",
  key: function (req, file, cb) {
    const newFileName = `${Date.now()}-${file.originalname}`;
    const fullPath = `image/${newFileName}`;
    cb(null, fullPath);
  },
});
const herokuUploadVideo = multerS3({
  s3: s3,
  bucket: "richdad6208node",
  acl: "public-read",
  key: function (req, file, cb) {
    const newFileName = `${Date.now()}-${file.originalname}`;
    const fullPath = `video/${newFileName}`;
    cb(null, fullPath);
  },
});
export const localMiddleWare = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user || {};
  res.locals.isHeroku = isHeroku;
  next();
};

export const protectPrivate = (req, res, next) => {
  if (!res.locals.loggedIn) {
    req.flash("error", "Login First");
    return res.redirect("/login");
  } else return next();
};

export const allowPublic = (req, res, next) => {
  if (res.locals.loggedIn) {
    req.flash("error", "This page for Public");
    return res.redirect("/");
  } else return next();
};

export const uploadAvatar = multer({
  dest: "uploads/avatar",
  limit: { fileSize: 100000 },
  storage: isHeroku ? herokuUploadImage : undefined,
});
export const uploadVideo = multer({
  dest: "uploads/video",
  limit: { fileSize: 10000000 },
  storage: isHeroku ? herokuUploadVideo : undefined,
});
