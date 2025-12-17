const Listing = require("../models/listing");
const {listingSchema,reviewSchema} = require("../schema.js");

module.exports.index = async(req,res)=>{
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs",{alllistings});
};


module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};


module.exports.createlisting = async(req,res,next)=>{

         let url = req.file.path;
         let filename = req.file.filename;

        // const result = listingSchema.validate(req.body);
        // console.log(result);
        // if(result.error){
        //     throw new ExpressError(400,result.error);
        // }
        let newlisting = new Listing(req.body.listing);
         newlisting.owner = req.user._id;
         newlisting.image = {url,filename};
         await newlisting.save();
        req.flash("success","successfully created a new listing");
        res.redirect("/listings");
       
};

module.exports.Showlisting = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate :{
            path :"Author"
        },}).populate("owner");
    if(!listing){
        req.flash("error","listing does not exist !");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};


module.exports.Editlisting = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing does not exist !");
        return res.redirect("/listings");
    }
    let originalImage = listing.image.url;
    originalImage.replace("/upload","/upload/h_200,w_300")

    res.render("listings/edit.ejs",{listing,originalImage});
};


module.exports.Updatelisting = async(req,res)=>{
    let {id} = req.params;
    if(!req.body.listing){
        throw new ExpressError(400,"SEND VALID DATA FOR LISTING");
    }
    
   let updatedlisting = await Listing.findByIdAndUpdate(id,{...req.body.listing});

   if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    updatedlisting.image = {url,filename};
    await updatedlisting.save();
   }
    req.flash("success","successfully updated  listing");
    res.redirect(`/listings/${id}`);
};


module.exports.Deletelisting = async(req,res)=>{
    let {id} = req.params;
    let deletel = await Listing.findByIdAndDelete(id);
    console.log(deletel);
    req.flash("success","successfully deleted  listing");
    res.redirect("/listings");

};