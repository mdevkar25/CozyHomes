if(process.env.NODE_ENV !== "production"){
    require('dotenv').config({path : ".env"});
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsaync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/reviews.js");
const listingsRout = require("./routes/listings.js");
const reviewsRout = require("./routes/reviews.js");
const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRout = require("./routes/user.js");
const { error } = require('console');

 

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine('ejs', ejsmate);








let dburl =process.env.ATLASDB_URL;

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log("error to connect with db",err);
});

async function main(){
    await mongoose.connect(dburl);
}

// app.get("/",(req,res)=>{
//     res.send("welcome to wondulust");
// });
app.get("/", (req, res) => {
    res.redirect("/listings");
});

//console.log(MongoStore);


const store = MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*60*60,
});

store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION  STORE",err);
});

const sessionoptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie :{
        expires : Date.now()+ 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnily : true,
    } 
};



app.use(session(sessionoptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});





app.use("/listings",listingsRout);
app.use("/listings/:id/reviews",reviewsRout);
app.use("/",userRout);






// error handling

app.all('/*splat',(req,res,next)=>{
    next(new ExpressError(404,"page not found !"));
});

app.use((err,req,res,next)=>{
    let {status= 500,message="something went wrong"} = err;
    // res.status(status).send(message);
    res.status(status).render("listings/Error.ejs",{message});
});



app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});
