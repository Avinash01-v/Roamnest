const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/01/scenery.jpg?ssl=1",
            set: (v) => v === " " ? "https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2014/01/scenery.jpg?ssl=1" : v,
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    category: {
        type: String,
        enum: [
            "Trending",
            "Rooms",
            "Mountains",
            "Cities",
            "Pools",
            "Camping",
            "Farms",
            "Arctic",
            "Beachfront",
            "Forest",
            "Villas",
            "Desert Nights",
            "Boathouses"
        ]
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;