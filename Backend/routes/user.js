const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const upload = require('../config/multer');
const isLoggedin = require('../middleware/isLoggedin');
require('dotenv').config();

router.post('/signup', upload.single('avatar'), async(req, res)=>{
    const {name, email, password} = req.body;
    try {
        let user = await userModel.findOne({email})
        if(user) return res.status(400).json({message: "User already exists"});
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, async (err, hash)=>{
                const CreatedUser = await userModel.create({
                    name, 
                    email,
                    password: hash,
                    avatar: req.file.filename,
                })
                const token = jwt.sign({id: CreatedUser._id, email: CreatedUser.email}, process.env.JWT_SECRET_KEY)
                res.cookie('token', token, {httpOnly: true})
                res.status(201).json({message: "User created successfully", user: CreatedUser})
            })
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});


router.post('/login', async(req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user) return res.status(400).json({message: "User not found"});
        bcrypt.compare(password, user.password, (err, result)=>{
            if(result){
                const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET_KEY)
                res.cookie('token', token, {httpOnly: true})
                res.status(200).json({message: "User logged in successfully", token: token, email: user.email, id: user._id})
            }else{
                return res.status(400).json({message: "Invalid password"})
            }
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

router.get('/logout', (req, res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

router.get('/get_user', isLoggedin, async(req, res)=>{
    try {
        const user = await userModel.findOne({_id: req.user.id});
        res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})


module.exports = router;