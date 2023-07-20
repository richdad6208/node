export const localMiddleWare = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user || {};
  console.log(req.sessionID);
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
