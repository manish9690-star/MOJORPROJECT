const express =require("express");
const wrapAsync = require("../utils/wrapAsync.js");

const router = express.Router({mergeParams:true});
const ExpressError=require("../utils/ExpressError.js")
const {reviewSchema}=require("../schema.js")
const Review=require("../models/review.js")
const Listing=require("../models/listing.js")
const {validateReview,isLoggedIn, isReviewAuthor}=require("../middleware.js")
const reviewsController=require("../controllers/reviews.js")


router.post("/",isLoggedIn, validateReview,wrapAsync(reviewsController.createReview));


router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewsController.destroyReview));

module.exports=router;