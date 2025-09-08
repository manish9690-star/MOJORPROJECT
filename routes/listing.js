const express = require("express");
const router=express.Router()

const app = express();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js")
const Review = require("../models/review.js");

const listings = require("../routes/listing.js"); // ✅ corrected
const listingsController = require("../controllers/listings.js"); // ✅ corrected
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });









// Index Route
router.route("/").get( wrapAsync(listingsController.index)
).post(isLoggedIn,validateListing,upload.single("listing[image]"),wrapAsync(listingsController.createListing))

// New Route
router.get("/new",isLoggedIn, listingsController.renderNewForm);

// Show Route
router.route("/:id").get( wrapAsync(listingsController.showListing)).put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingsController.updateListing)).delete(isLoggedIn, wrapAsync(listingsController.destroyListing));;

//create

router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingsController.renderEditForm));


module.exports = router;