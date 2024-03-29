const Comment = require('../models/comment');
const mongo = require('mongodb');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/user');
const Event = require('../models/event');
const { update } = require('../models/comment');
const cloudinary = require('cloudinary');

//create new comment => /api/v1/:id/comment/new


exports.newComment = catchAsyncError(async (req, res, next) => {
    const date = new Date();
    try {
        const { eventId, image, comment, rate } = req.body
        const userId = req.user.id
        const base64 = image.split(';base64,').pop();
        const result = await cloudinary.v2.uploader.upload(image, {
            folder: 'comments',
            width: 650,
            quality: 100,
            crop: "scale"
        })

        const event = await Event.findById(eventId).populate({ path: 'comments', populate: { path: 'userId', select: ['firstName', "lastName", 'avatar'] } });

        // if (event.eventEndDate < date) return res.status(404).json( 'Event is finished' )
        if (event.commentStatus === false) return res.status(404).json( 'Disabled Comments' )

        if (!event) return res.status(404).json("This post does not exist." )
       
        if (event.comments.some(e => e.userId.id === userId)) {
            return res.status(404).json("You have already commented this event." )
        }
        const newComment = new Comment({
            image: { public_id: result.public_id, url: result.secure_url }, comment, userId, eventId, rate
        })

        await Event.findOneAndUpdate({ _id: eventId }, {
            $push: { comments: newComment._id }
        }, { new: true })

        await User.findOneAndUpdate({ _id: userId }, {
            $push: { comments: newComment._id }
        }, { new: true })
        newComment.populate({ path: 'userId', select: ['name', 'avatar'] })
        await newComment.save()

        res.json({ newComment })

    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// get all comments for user => /api/v1/:id/comment
exports.getUserComments = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.params.id
        const comments = await Comment.find({ userId: userId }).populate({ path: 'eventId', select: ['title', 'comments'] }).populate({ path: 'userId', select: ['name', 'avatar'] })
        res.json({ comments })
    } catch (err) {
        return res.status(500).json(err.message)
    }
})


//create new comment => /api/v1/:id/:cid

exports.deleteComment = catchAsyncError(async (req, res, next) => {
    try {
        const comment = await Comment.findOneAndDelete({
            _id: req.params.id,
        })

        await Event.findOneAndUpdate({ _id: comment.eventId }, {
            $pull: { comments: req.params.id }
        })
        await User.findOneAndUpdate({ _id: comment.userId }, {
            $pull: { comments: req.params.id }
        })

        res.json({ msg: 'Deleted Comment!' })

    } catch (err) {
        return res.status(500).json( err.message )
    }
})
