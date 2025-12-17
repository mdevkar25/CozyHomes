const Review = require("../models/reviews.js");
const Listing = require("../models/listing");


module.exports.CreateReview = async (req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.Author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","successfully created  review");
     res.redirect(`/listings/${listing._id}`);
    // res.send("new listing review");

};

module.exports.DeleteReview = async (req,res)=>{
    let {id,reviewId} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","successfully deleted  review");

    res.redirect(`/listings/${id}`);
};