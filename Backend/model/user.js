const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: function() {
            return !this.googleId; // Password is required only if googleId is not present
        },
    },
    googleId: {
        type: String,
        sparse: true, // Allows null/undefined values
        unique: true, // But ensures uniqueness for non-null values
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    },
    avatar:{
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    }
})

module.exports = mongoose.model('User', userSchema);