const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsaync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js"); 
const {isLoggedin,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })


router
    .route("/")
    .get( wrapAsync(listingController.index))
    .post( 
        isLoggedin,
        upload.single('listing[image][url]'),
        validateListing,
        wrapAsync(listingController.createlisting)
    );
    // .post(upload.single('listing[image][url]'),
    //     (req,res)=>{
    //     res.send(req.file);
    // });

router.get("/new",isLoggedin,listingController.renderNewForm);


router
    .route("/:id")
    .get(wrapAsync(listingController.Showlisting))
    .put(
        isLoggedin,
        isOwner,
        upload.single('listing[image][url]'),
        validateListing,
        wrapAsync(listingController.Updatelisting))
    .delete(
        isLoggedin,
        isOwner,
        wrapAsync(listingController.Deletelisting)
    );

router.get("/:id/edit",
    isLoggedin,
    isOwner,
    validateListing,
    wrapAsync(listingController.Editlisting)
);



// index route
// router.get("/", wrapAsync(listingController.index));


// creat

//router.get("/new",isLoggedin,listingController.renderNewForm);

// create rout

//router.post("/", isLoggedin,validateListing,wrapAsync(listingController.createlisting));


// show routs
//router.get("/:id",wrapAsync(listingController.Showlisting));


// update routs
// router.get("/:id/edit",isLoggedin,isOwner,validateListing,wrapAsync(listingController.Editlisting));

//router.put("/:id",
    // isLoggedin,
    // isOwner,
    // wrapAsync(listingController.Updatelisting));

// delete

//router.delete("/:id",
    // isLoggedin,
    // isOwner,
    // wrapAsync(listingController.Deletelisting));

module.exports = router;