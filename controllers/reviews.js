
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.createReview=(async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author=req.user._id; // Set the author of the review

  listing.reviews.push(newReview); // Add review to the listing's reviews array
  await newReview.save();          // Save the review document
  await listing.save();   
  req.flash("success","New Review Created!")         // Save the updated listing

 res.redirect(`/listings/${listing._id}`);
})



module.exports.destroyReview=(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!")

    res.redirect(`/listings/${id}`);
})