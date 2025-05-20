const express = require('express');
const router = express.Router();
const noteModel = require('../model/note');
const isLoggedin = require('../middleware/isLoggedin');


router.post('/createNote', isLoggedin, async(req,res)=>{
    try {
        const {title, content, caption} = req.body;
        const note = await nodeModel.create({
            title,
            content,
            caption,
            userId: req.user.id,
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
        const note = await noteModel.findOneAndUpdate({_id: id, userId: req.user.id}, {
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
        const deletedNote = await noteModel.findOneAndDelete({_id: id, userId: req.user.id});
        res.status(200).json({message: "Note deleted successfully", deletedNote});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})


router.get('/allNotes', isLoggedin, async(req , res)=>{
    try {
        const notes = await noteModel.find({userId: req.user.id});
        res.status(200).json({notes});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})



module.exports = router;