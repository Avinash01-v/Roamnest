const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema");
const Listing = require("../models/listing");
const Review = require("../models/review");
const { isloggedin, isreviewauthor } = require("../middleware");


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details
            .map((el) => el.message)
            .join(", ");

        return next(new ExpressError(400, errMsg));
    }
    next();
};

//review post route
router.post("/", validateReview, isloggedin, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("new review was saved");
    req.flash("success", "new review created!");
    res.redirect(`/listings/${id}`);
}));

//review delete route
router.delete("/:reviewId", isloggedin,isreviewauthor, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("success", "review deleted!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;