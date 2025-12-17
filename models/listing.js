const mongoose = require("mongoose");
const Review = require("./reviews");
const Schema = mongoose.Schema;

const listingschema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
         
         //type : String,
         filename: String,
         url:String,
         //default:"https://images.unsplash.com/photo-1589419896452-b460b8b390a3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFpcmJuYnxlbnwwfHwwfHx8MA%3D%3D",
         //set:(v)=> v === " "?"https://images.unsplash.com/photo-1589419896452-b460b8b390a3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFpcmJuYnxlbnwwfHwwfHx8MA%3D%3D":v,
    },
    price:{
        type:Number,
    },
    location:String,
    country:String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    owner :{
        type : Schema.Types.ObjectId,
        ref : "User"
    }
});


listingschema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingschema);

module.exports = Listing;