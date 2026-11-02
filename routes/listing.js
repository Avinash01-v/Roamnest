const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");
const Listing = require("../models/listing");
const { isloggedin, isowner } = require("../middleware");

const multer = require('multer');
const { storage } = require("../cloudconfig");
const upload = multer({ storage });

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({
    accessToken: mapToken
});

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details
            .map((el) => el.message)
            .join(", ");

        return next(new ExpressError(400, errMsg));
    }
    next();
};

//index route
router.get("/", wrapAsync(async (req, res) => {
    const { category } = req.query;

    let filter = {};

    if (category && category !== "Trending") {
        filter.category = category;
    }

    const allListings = await Listing.find(filter);

    res.render("listings/index.ejs", {
        allListings,
        category
    });
    // const allListings = await Listing.find({});
    // res.render("listings/index.ejs", { allListings });
}));

//new route
router.get("/new", isloggedin, (req, res) => {
    res.render("listings/new.ejs");
});

router.get("/search", wrapAsync(async (req, res) => {
    let { query } = req.query;

    // If the search box is empty
    if (!query || !query.trim()) {
        return res.redirect("/listings");
    }

    query = query.trim();

    // Escape special regex characters
    const searchTerm = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Search by title, location, or country
    const allListings = await Listing.find({
        $or: [
            { title: { $regex: searchTerm, $options: "i" } },
            { location: { $regex: searchTerm, $options: "i" } },
            { country: { $regex: searchTerm, $options: "i" } }
        ]
    });

    res.render("listings/index.ejs", { allListings , query });
}));

//edit route
router.get("/:id/edit", isloggedin, isowner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "listing you are looking for does not exist");
        return res.redirect("/listings");
    }
    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload", "/upload/w_300,h_200,e_blur:300");
    res.render("listings/edit.ejs", { listing, originalImage });
}));

//show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    // console.log(listing);
    if (!listing) {
        req.flash("error", "listing you are looking for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing, mapToken: process.env.MAP_TOKEN });
}));

//create route
router.post("/", isloggedin, upload.single('listing[image][url]'), validateListing, wrapAsync(async (req, res) => {

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    const response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        })
        .send();

    if (! response.body.features ||  response.body.features.length === 0) {
        req.flash("error", "Location not found. Please enter a valid location.");
        return res.redirect("/listings/new");
    }
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success", "new listing created!");
    res.redirect("/listings");
}));

//update route
router.put("/:id", isloggedin, isowner, upload.single('listing[image][url]'), validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename }
        await listing.save();
    }
    req.flash("success", "listing updated!");
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id", isloggedin, isowner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const dltlisting = await Listing.findByIdAndDelete(id);
    console.log(dltlisting);
    req.flash("success", "listing deleted!");
    res.redirect("/listings");
}));

module.exports = router;