const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const wrapAsaync = require("../utils/wrapAsaync.js");
const {RedirectSaveUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");


router
    .route("/Signup")
    .get(userController.renderSignupForm)
    .post(wrapAsaync(userController.userSignup));

// router.get("/Signup",userController.renderSignupForm);

// router.post("/signup",wrapAsaync(userController.userSignup));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(RedirectSaveUrl,
        passport.authenticate("local",
        {
            failureRedirect:"/login",
            failureFlash:true
        })
        ,userController.userLogin
);

//router.get("/login",userController.renderLoginForm);

// router.post("/login",RedirectSaveUrl,
//     passport.authenticate("local",
//     {
//         failureRedirect:"/login",
//         failureFlash:true
//     })
// ,userController.userLogin);

router.get("/logout",userController.userLogout);


module.exports = router;