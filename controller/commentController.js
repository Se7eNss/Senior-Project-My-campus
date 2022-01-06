const Comment = require('../models/comment');
const mongo = require('mongodb');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/user');
const Event = require('../models/event');
const { update } = require('../models/comment');


//create new comment => /api/v1/:id/comment/new


exports.newComment = catchAsyncError(async(req,res,next)=>{
    try {
        const { eventId, image, comment} = req.body
        const userId = req.user.id

        const event = await Event.findById(eventId)
        if(!event) return res.status(400).json({msg: "This post does not exist."})

        const newComment = new Comment({
            user: req.user._id, image,  comment, userId, eventId
        })

        await Event.findOneAndUpdate({_id: eventId}, {
            $push: {comments: newComment._id}
        }, {new: true})

        await User.findOneAndUpdate({_id: userId}, {
            $push: {comments: newComment._id}
        }, {new: true})

        await newComment.save()

        res.json({newComment})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

//create new comment => /api/v1/:id/:cid

exports.deleteComment = catchAsyncError(async(req,res,next)=>{
    try {
        const comment = await Comment.findOneAndDelete({
            _id: req.params.id,
        })

        await Event.findOneAndUpdate({_id: comment.eventId}, {
            $pull: {comments: req.params.id}
        })
        await User.findOneAndUpdate({_id: comment.userId}, {
            $pull: {comments: req.params.id}
        })

        res.json({msg: 'Deleted Comment!'})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})
