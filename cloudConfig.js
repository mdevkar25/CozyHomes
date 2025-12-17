const cloudinary = require('cloudinary');
const  {CloudinaryStorage}  = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name :process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowedFormats: ["jpg",'png','jpeg'],
    
  },
});

if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
  console.error("Cloudinary ENV not set"); // will show in console if missing
}
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);



module.exports = {
    cloudinary,
    storage,
}