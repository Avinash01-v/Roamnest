
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {
        listing: {
            type: Schema.Types.ObjectId,
            ref: "Listing",
            required: true
        },

        guest: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        checkIn: {
            type: Date,
            required: true
        },

        checkOut: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return !this.checkIn || value > this.checkIn;
                },
                message: "Check-out must be after check-in."
            }
        },

        guests: {
            type: Number,
            required: true,
            min: [1, "At least one guest is required."],
            max: [20, "Maximum 20 guests allowed."]
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "rejected", "cancelled"],
            default: "pending"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
