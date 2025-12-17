const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initdata = require("./data");

let MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log("error to connect with db",err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initdb = async()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner :'69273fbd9d20a3fbfca46950'}));
    await Listing.insertMany(initdata.data);
    console.log("data inserted");
}

initdb();