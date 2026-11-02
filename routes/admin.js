
const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const { isloggedin, isAdmin } = require("../middleware");

const User = require("../models/user");
const Listing = require("../models/listing");
const Booking = require("../models/booking");
const Review = require("../models/review");

// Admin Dashboard
router.get(
    "/",
    isloggedin,
    isAdmin,
    wrapAsync(async (req, res) => {
        const [
            totalUsers,
            totalListings,
            totalBookings,
            totalReviews,
            pendingBookings,
            recentBookings,
            recentUsers
        ] = await Promise.all([
            User.countDocuments(),
            Listing.countDocuments(),
            Booking.countDocuments(),
            Review.countDocuments(),
            Booking.countDocuments({ status: "pending" }),
            Booking.find()
                .populate("listing")
                .populate("guest")
                .sort({ createdAt: -1 })
                .limit(5),
            User.find()
                .sort({ _id: -1 })
                .limit(5)
        ]);

        res.render("admin/dashboard.ejs", {
            totalUsers,
            totalListings,
            totalBookings,
            totalReviews,
            pendingBookings,
            recentBookings,
            recentUsers
        });
    })
);


/* Users Management */
router.get(
    "/users",
    isloggedin,
    isAdmin,
    wrapAsync(async (req, res) => {
        const search = (req.query.search || "").trim();

        const filter = search
            ? {
                $or: [
                    { username: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ]
            }
            : {};

        const users = await User.find(filter).sort({ _id: -1 });

        res.render("admin/user.ejs", {
            users,
            search
        });
    })
);


/* Listings Management */
router.get(
    "/listings",
    isloggedin,
    isAdmin,
    wrapAsync(async (req, res) => {
        const search = (req.query.search || "").trim();

        const filter = search
            ? {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { location: { $regex: search, $options: "i" } },
                    { country: { $regex: search, $options: "i" } }
                ]
            }
            : {};

        const listings = await Listing.find(filter)
            .populate("owner")
            .sort({ _id: -1 });

        res.render("admin/listings.ejs", {
            listings,
            search
        });
    })
);


/* Bookings Management */
router.get(
    "/bookings",
    isloggedin,
    isAdmin,
    wrapAsync(async (req, res) => {
        const status = req.query.status || "";

        const allowedStatuses = [
            "pending",
            "confirmed",
            "rejected",
            "cancelled"
        ];

        const filter = allowedStatuses.includes(status)
            ? { status }
            : {};

        const bookings = await Booking.find(filter)
            .populate("listing")
            .populate("guest")
            .sort({ _id: -1 });

        res.render("admin/bookings.ejs", {
            bookings,
            status
        });
    })
);


/* Reviews Management */
router.get(
    "/reviews",
    isloggedin,
    isAdmin,
    wrapAsync(async (req, res) => {
        const reviews = await Review.find()
            .populate("author")
            .sort({ _id: -1 });

        const listings = await Listing.find()
            .select("title reviews");

        const listingMap = new Map();

        listings.forEach(listing => {
            listing.reviews.forEach(reviewId => {
                listingMap.set(reviewId.toString(), listing.title);
            });
        });

        const reviewData = reviews.map(review => ({
            review,
            listingTitle: listingMap.get(review._id.toString()) || "Property unavailable"
        }));

        res.render("admin/reviews.ejs", {
            reviewData
        });
    })
);


module.exports = router;
