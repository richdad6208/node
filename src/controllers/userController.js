import User from "../models/User";
import Video from "../models/Video";
import Comment from "../models/Comment";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req, res) => {
  res.render("createAccount", { pageTitle: "create new account" });
};

export const postJoin = async (req, res) => {
  try {
    const { username, password, password2, email, realname, address } =
      req.body;
    const existUsername = await User.exists({
      $or: [{ username }, { email }],
    });
    if (existUsername) {
      return res.status(400).render("createAccount", {
        pageTitle: "createAccount",
        errorMessage: "아이디/이메일이 중복됩니다. 다른아이디를 사용하세요",
      });
    }
    if (password !== password2) {
      return res.status(400).render("createAccount", {
        pageTitle: "createAccount",
        errorMessage: "비밀번호가 일치하지 않습니다",
      });
    }

    await User.create({
      username,
      password,
      avatarUrl: "../../images/account-icon-default.png",
      email,
      realname,
      address,
    });

    return res.redirect("/login");
  } catch (error) {
    console.log("error:", error);
    return res.status(400).redirect("/join");
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "login" });
};
export const postLogin = async (req, res) => {
  const pageTitle = "login";
  const { username, password } = req.body;
  const user = await User.findOne({ username, socialLogin: false });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "아이디가 존재하지 않습니다",
    });
  }
  const userPasswordCompare = await bcrypt.compare(password, user.password);
  if (!userPasswordCompare) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "비밀번호가 일치하지 않습니다",
    });
  }
  req.session.loggedIn = "true";
  req.session.user = user;
  return res.redirect("/");
};

export const loginGithubStart = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    scope: "read:user user:email",
  };
  const configUrl = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${configUrl}`;
  return res.redirect(finalUrl);
};

export const loginGithubFinish = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET,
    code: req.query.code,
  };
  const configUrl = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${configUrl}`;
  const requestToken = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  const { access_token } = requestToken;
  const apiUrl = "https://api.github.com";

  if ("access_token" in requestToken) {
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        username: userData.login,
        avatarUrl: userData.avatar_url,
        socialLogin: true,
        password: "",
        email: emailObj.email,
        realname: userData.name,
        address: userData.location,
      });
    }
    req.session.loggedIn = "true";
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  res.locals.loggedIn = false;
  req.session.destroy();
  return res.redirect("/login");
};

export const getEdit = (req, res) => {
  console.log(res.locals.user.avatarUrl);
  return res.render("userEdit");
};

// look here =================================
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { username, email, realname, address },
    file,
  } = req;
  if (req.session.user.username !== username) {
    const existId = await User.exists({ username });
    if (existId) {
      return res.render("userEdit", {
        errorMessage: "동일한 username이 있습니다",
      });
    }
  }
  console.log(file);
  if (req.session.user.email !== email) {
    const existEmail = await User.exists({ email });
    if (existEmail) {
      return res.render("userEdit", {
        errorMessage: "동일한 email이 있습니다",
      });
    }
  }
  const isHeroku = process.env.NODE_ENV === "production";
  const fixedUser = await User.findByIdAndUpdate(
    _id,
    {
      username,
      avatarUrl: file ? (isHeroku ? file.location : file.path) : avatarUrl,
      email,
      realname,
      address,
    },
    { new: true }
  );
  req.session.user = fixedUser;
  return res.redirect("/user/edit");
};
// look here =================================

export const getChangePassword = (req, res) => {
  return res.render("user/changePassword", { pageTitle: "Password Change" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  if (newPassword !== newPasswordConfirmation) {
    return res.render("user/changePassword", {
      pageTitle: "Password Change",
      errorMessage: "New Password Not Same",
    });
  }
  const comparePassword = await bcrypt.compare(
    oldPassword,
    req.session.user.password
  );
  if (!comparePassword) {
    return res.render("user/changePassword", {
      pageTitle: "Password Change",
      errorMessage: "Old Password Not Same",
    });
  }
  const user = await User.findByIdAndUpdate(_id, { password: newPassword });
  req.session.user.password = newPassword;
  await user.save();
  return res.redirect("/");
};

export const profile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");
  return res.render("user/profile", {
    pageTitle: user.realname,
    user,
  });
};

export const deleteComment = async (req, res) => {
  const id = req.params.commentId;
  console.log(id);
  try {
    await Comment.deleteOne({ _id: id });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
