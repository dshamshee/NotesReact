const mongoose = require('mongoose');


const googleUserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    // googleId:{
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
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


module.exports = mongoose.model('GoogleUser', googleUserSchema);