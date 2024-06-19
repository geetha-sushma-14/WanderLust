const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utilities/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
//Reviews
//Post review routing
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));

//delete review routing
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;