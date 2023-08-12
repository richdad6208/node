import multer from "multer";
import multerS3 from "multer-s3";

const multerS3Upload = multerS3({
  s3: s3,
  bucket: "richdad6208node",
});

export const localMiddleWare = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user || {};
  next();
};

export const protectPrivate = (req, res, next) => {
  if (!res.locals.loggedIn) return res.redirect("/login");
  else return next();
};

export const allowPublic = (req, res, next) => {
  if (res.locals.loggedIn) return res.redirect("/");
  else return next();
};

export const uploadAvatar = multer({
  dest: "uploads/avatar",
  limit: { fileSize: 100000 },
  storage: multerS3Upload,
});
export const uploadVideo = multer({
  dest: "uploads/video",
  limit: { fileSize: 10000000 },
  storage: multerS3Upload,
});
