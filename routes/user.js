const express = require("express");
const router = express.Router();
const user = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

router.get("/signUp", (req, res) => {
    res.render("listings/signup.ejs");
});

router.post("/signUp", wrapAsync(async (req, res,next) => {
    try {
        let { email, username, password } = req.body;
        const Users = new user({ email, username });
        const newUser = await user.register(Users, password);
        console.log(newUser);
        req.login(newUser, (err) => {
            if(err){
                return next();
            }
            req.flash("success", "Welcome to Roamnest");
            return res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signUp");
    }
}));

router.get("/login", (req, res) => {
    res.render("listings/login.ejs");
});

router.post("/login",saveRedirectUrl, passport.authenticate('local', { failureRedirect: "/login", failureFlash: true }), (req, res) => {
    req.flash("success", "Welcome to Roamnest");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
            return res.redirect("/listings");
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    });
});

module.exports = router;