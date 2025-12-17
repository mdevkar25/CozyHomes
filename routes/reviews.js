const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsaync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/reviews.js");
const {validateReview,isLoggedin,isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");






router.post("/" ,
    isLoggedin,
    validateReview,
    wrapAsync( reviewController.CreateReview));

// delete review

router.delete("/:reviewId",
    isLoggedin,
    isAuthor,
     wrapAsync(reviewController.DeleteReview ))


module.exports = router;