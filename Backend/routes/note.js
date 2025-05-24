const express = require('express');
const router = express.Router();
const noteModel = require('../model/note');
const isLoggedin = require('../middleware/isLoggedin');


router.post('/createNote', isLoggedin, async(req,res)=>{
    try {
        const {title, content, caption} = req.body;
        const note = await noteModel.create({
            title,
            content,
            caption,
            author: req.user.id,
        })
        res.status(201).json({message: "Note created successfully", note});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

router.post('/updateNote/:id', isLoggedin, async(req, res)=>{
    try {
        const {title, content, caption} = req.body;
        const id = req.params.id;
        const note = await noteModel.findOneAndUpdate({_id: id, author: req.user.id}, {
            title,
            content,
            caption,
            updatedAt: Date.now(),
        }, {new: true});
        res.status(200).json({message: "Note updated successfully", note});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

router.get('/deleteNote/:id', isLoggedin, async(req, res)=>{
    try {
        const id = req.params.id;
        const deletedNote = await noteModel.findOneAndDelete({_id: id, author: req.user.id});
        res.status(200).json({message: "Note deleted successfully", deletedNote});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})


router.get('/getNote/:id', isLoggedin, async(req, res)=>{
    try {
        const id = req.params.id;
        const note = await noteModel.findOne({_id: id, author: req.user.id});
        res.status(200).json({note});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})  

router.get('/allNotes', isLoggedin, async(req , res)=>{
    try {
        const notes = await noteModel.find({author: req.user.id});
        res.status(200).json({notes});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})



module.exports = router;