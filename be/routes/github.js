const express = require("express");
const github = express.Router();
const GithubStrategy = require("passport-github2").Strategy;
const jwt = require("jsonwebtoken");
const session = require("express-session");
const passport = require("passport");
const UsersModel = require("../models/users");
const crypto = require("crypto");
const { log } = require("console");
require("dotenv").config();

github.use(
  session({
    secret: process.env.GITHUB_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(passport.initialize());
passport.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.GITHUB_URL_CALLBACK,
      proxy: true,
      scope: ["user: email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { _json } = profile;
      const user = await UsersModel.findOne({
        email: _json.email || "test@email.it",
      });

      if (!user) {
        const fullName = _json.name.split(" ");
        const newUser = new UsersModel({
          firstName: fullName[0],
          lastName: fullName[1],
          email: _json.email || "test@email.it",
          password: crypto.randomBytes(10).toString("hex"),
        });
        await newUser.save();
      }

      return done(null, profile);
    }
  )
);

github.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user: email"] }, (req, res) => {
    const redirectUrl = `${process.env.FE_URL}/success?user=${encodeURIComponent(
      JSON.stringify(req.user)
    )}`;
    res.redirect(redirectUrl);
  })
);

github.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(user, process.env.SECRET_KEY);
    const redirectUrl = `${process.env.FE_URL}/success?token=${encodeURIComponent(
      token
    )}`;
    res.redirect(redirectUrl);
  }
);

github.get("/success", (req, res) => {
  res.redirect(`${process.env.FE_URL}/home`);
});

module.exports = github;
