
const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const { isloggedin } = require("../middleware");
const Listing = require("../models/listing");
const Booking = require("../models/booking");

router.get(
    "/my-trips",
    isloggedin,
    wrapAsync(async (req, res) => {
        const bookings = await Booking.find({
            guest: req.user._id
        })
            .populate("listing")
            .sort({ createdAt: -1 });

        res.render("bookings/myTrips.ejs", { bookings });
    })
);

// Owner booking dashboard
router.get(
    "/bookings",
    isloggedin,
    wrapAsync(async (req, res) => {
        const bookings = await Booking.find({ owner: req.user._id })
            .populate("listing")
            .populate("guest")
            .sort({ createdAt: -1 });

        res.render("bookings/index.ejs", { bookings });
    })
);

// Cancel Booking
router.post("/bookings/:id/cancel", isloggedin, wrapAsync(async (req, res) => {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
        req.flash("error", "Booking not found!");
        return res.redirect("/my-trips");
    }

    // Only the guest who made the booking can cancel it
    if (!booking.guest.equals(req.user._id)) {
        req.flash("error", "You are not authorized to cancel this booking!");
        return res.redirect("/my-trips");
    }

    // Only pending or confirmed bookings can be cancelled
    if (!["pending", "confirmed"].includes(booking.status)) {
        req.flash("error", "This booking cannot be cancelled!");
        return res.redirect("/my-trips");
    }

    booking.status = "cancelled";
    await booking.save();

    req.flash("success", "Booking cancelled successfully!");
    res.redirect("/my-trips");
}));

// Create booking request
router.post(
    "/listings/:id/book",
    isloggedin,
    wrapAsync(async (req, res) => {
        const { id } = req.params;
        const { checkIn, checkOut, guests } = req.body;

        const listing = await Listing.findById(id);

        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }

        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const guestCount = Number(guests);

        if (
            !checkIn ||
            !checkOut ||
            Number.isNaN(startDate.getTime()) ||
            Number.isNaN(endDate.getTime()) ||
            startDate < new Date(new Date().toDateString()) ||
            endDate <= startDate ||
            !Number.isInteger(guestCount) ||
            guestCount < 1 ||
            guestCount > 20
        ) {
            req.flash("error", "Please enter valid booking details.");
            return res.redirect(`/listings/${id}`);
        }

        if (listing.owner.equals(req.user._id)) {
            req.flash("error", "You cannot book your own listing!");
            return res.redirect(`/listings/${id}`);
        }

        const booking = new Booking({
            listing: listing._id,
            guest: req.user._id,
            owner: listing.owner,
            checkIn: startDate,
            checkOut: endDate,
            guests: guestCount
        });

        await booking.save();

        req.flash("success", "Booking request sent to the owner!");
        res.redirect(`/listings/${id}`);
    })
);

// Approve booking
router.post(
    "/bookings/:bookingId/approve",
    isloggedin,
    wrapAsync(async (req, res) => {
        const { bookingId } = req.params;

        const booking = await Booking.findOne({
            _id: bookingId,
            owner: req.user._id,
            status: "pending"
        });

        if (!booking) {
            req.flash(
                "error",
                "Booking not found or you cannot approve it."
            );
            return res.redirect("/bookings");
        }

        // Check for overlapping confirmed bookings
        const overlappingBooking = await Booking.findOne({
            listing: booking.listing,
            _id: { $ne: booking._id },
            status: "confirmed",
            checkIn: { $lt: booking.checkOut },
            checkOut: { $gt: booking.checkIn }
        });

        if (overlappingBooking) {
            req.flash(
                "error",
                "These dates overlap another confirmed booking!"
            );
            return res.redirect("/bookings");
        }

        booking.status = "confirmed";
        await booking.save();

        req.flash("success", "Booking approved successfully!");
        res.redirect("/bookings");
    })
);

// Reject booking
router.post(
    "/bookings/:bookingId/reject",
    isloggedin,
    wrapAsync(async (req, res) => {
        const { bookingId } = req.params;

        const booking = await Booking.findOne({
            _id: bookingId,
            owner: req.user._id,
            status: "pending"
        });

        if (!booking) {
            req.flash(
                "error",
                "Booking not found or you cannot reject it."
            );
            return res.redirect("/bookings");
        }

        booking.status = "rejected";
        await booking.save();

        req.flash("success", "Booking rejected.");
        res.redirect("/bookings");
    })
);

module.exports = router;
