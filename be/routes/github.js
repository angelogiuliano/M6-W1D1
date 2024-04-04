const express = require("express")
const github = express.Router()
const GithubStrategy = require('passport-github2').Strategy
const jwt = require('jsonwebtoken')
const session = require('express-session')
const passport = require("passport")
require('dotenv').config();

github.use(
    session({
        secret: process.env.GITHUB_SECRET,
        resave: false,
        saveUninitialized: false,
    })
)

passport.use(passport.initialize())
passport.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(
    new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: process.env.GITHUB_URL_CALLBACK
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile)
    })
)

github.get('/auth/github', passport.authenticate('github', {scope: ['user: email']}, (req, res) => {

}))

github.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/'}), (req, res) => {

})

github.get('/success', (req, res) => {
    
})

module.exports = github