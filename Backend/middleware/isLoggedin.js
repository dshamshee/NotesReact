const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


module.exports = async(req, res, next)=>{
    if(!req.cookies.token) return res.status(401).json({message: "cookie not found"});

    try {
        // let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
        let decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        let user = await userModel.findOne({_id: decoded.id}).select('-password');
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: error.message});
    }
}
