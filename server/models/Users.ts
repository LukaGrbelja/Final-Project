import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    usertype: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;