
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportlocalmongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

userSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("User", userSchema);
