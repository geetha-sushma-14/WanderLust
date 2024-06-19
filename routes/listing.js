const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilities/wrapAsync.js");
const {isLoggedIn, isOwner ,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const {storage}=require("../cloudconfig.js");
const upload = multer({storage});

router.route("/")
    .get(wrapAsync(listingController.index)) //index
    .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing)); //create
//new routing
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListing)) //show
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing)) //update
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)); //delete

//edit routing
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

router.post("/filter",(req,res)=>{
    let {place}=req.body;
    res.redirect(`/listings/filter/${place}`);
});

router.get("/filter/:id",wrapAsync(listingController.filter));
module.exports = router;