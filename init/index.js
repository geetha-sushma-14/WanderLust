const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

main()
    .then(()=>{console.log("connected to DB");})
    .catch((err)=>{console.log(err);});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

// const initDB = async ()=>{
//    await Listing.deleteMany({});
//    let datas= initdata.data;
//    for(let data of datas){
//      let title = data.title;
//      let description = data.description;
//      let image = data.image.url;
//      let price = data.price;
//      let location = data.location;
//      let country = data.country;
//      let sampleListing = new Listing({
//         title: title,
//         description: description,
//         image : image,
//         price: price,
//         location: location,
//         country: country,
//         owner : "6670a01e1a95ca0bcd15f50f",
//     });
//     await sampleListing.save();
    
//    };
//    console.log("initialized");
   
// };
const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner:'6671e164a7ae7c038243c4d3'}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
  };
  
initDB();

