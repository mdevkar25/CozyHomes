const User = require("../models/user");


module.exports.renderSignupForm = async(req,res)=>{
    res.render("user/signup.ejs");
}


module.exports.userSignup = async(req,res,next)=>{
    try{
        let {username,email,password} = req.body;
        const newuser = new User({username,email});
        const registeruser = await User.register(newuser,password);
        console.log(registeruser);
        req.login(registeruser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WanderLust!");
            res.redirect("/listings");
        })
        
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("user/login.ejs");
};

module.exports.userLogin = async(req,res)=>{
    req.flash("success","welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.userLogout = async(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    })
};