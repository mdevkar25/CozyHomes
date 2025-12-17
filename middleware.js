const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const reviews = require("./models/reviews.js");

module.exports.isLoggedin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be Logged in first!");
        return res.redirect("/login");
    }
    next();
};

module.exports.RedirectSaveUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You dont have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAuthor = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let listing = await reviews.findById(reviewId);
    if(!listing.Author._id.equals(res.locals.currUser._id)){
        req.flash("error","You dont have permission to delete");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = async(req,res,next)=>{
    const {error} = listingSchema.validate(req.body);
    if(error){
        let errmesg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400,errmesg);
    }else{
        next();
    }
}

module.exports.validateReview = async(req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        let errmesg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400,errmesg);
    }else{
        next();
    } 
}