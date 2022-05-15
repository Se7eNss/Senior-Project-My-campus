const catchAsyncError = require('../middlewares/catchAsyncError');
const Event = require('../models/event');
const User = require('../models/user');
const Comment = require('../models/comment');
const ErrorHandler = require('../utils/errorHandler');




exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
    try {
        const users = await User.find();
        res.json({users})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
)

exports.changeUserStatus = catchAsyncError(async(req,res,next)=>{
    try {
        const user = await User.findOneAndUpdate({_id:req.params.id},{status:req.params.status},{new:true});
        res.json({user})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
)

exports.getAllEvents = catchAsyncError(async(req,res,next)=>{
    try {
        const events = await Event.find().populate({path:'user',select: ['firstName',"lastName"]});
        res.json({events})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
)

exports.changeEventStatus = catchAsyncError(async(req,res,next)=>{
    try {
        const events = await Event.findOneAndUpdate({_id:req.params.id},{status:req.params.status},{new:true});
        res.json({events})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
)

exports.eventSeenByAdmin = catchAsyncError(async(req,res,next)=>{
    try {
        const events = await Event.findOneAndUpdate({_id:req.params.id},{seenByAdmin:true},{new:true});
        res.json({events})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
)
exports.getUnseenEvents = catchAsyncError(async(req,res,next)=>{
    try {
        const events = await Event.find({seenByAdmin:false}).populate({path:'user',select: ['firstName',"lastName","avatar"]});
        res.json({events})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
)

exports.getMostCommentedEvents = catchAsyncError(async(req,res,next)=>{
    try {
        const events = await Event.find().sort({comments: -1}).limit(5).populate({path:'user',select: ['firstName',"lastName","avatar"]});
        res.json({events})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
)


//get users grouped by created month 
exports.getUsersGroupedByCreatedDates = catchAsyncError(async(req,res,next)=>{
    try {
        const users = await User.aggregate([
            {$group: {
                _id: {$month: "$createdAt"},
                count: {$sum: 1}
            }},
            {$sort: {_id: 1}}
        ]);
        const events = await Event.aggregate([
            {$group: {
                _id: {$month: "$createdAt"},
                count: {$sum: 1}
            }},
            {$sort: {_id: 1}}
        ]);
        const comments = await Comment.aggregate([
            {$group: {
                _id: {$month: "$createdAt"},
                count: {$sum: 1}
            }},
            {$sort: {_id: 1}}
        ]);
        res.json({users,events,comments})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
)

exports.deleteEvent = catchAsyncError(async(req,res,next)=>{
    try {
        const events = await Event.findOneAndDelete({_id:req.params.id});
        if (!events) {
            return next(new ErrorHandler('Event not found', 404))
        }
    
        events.comments.forEach(async (comment) => {
            await Comment.findByIdAndDelete(comment);
        })
        events.comments.forEach(async (comment) => {
            await User.findByIdAndUpdate(comment.userId._id, {
                $pull: { comments: comment }
            })
        })
        
        res.json({events})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
)

exports.getAllComments = catchAsyncError(async(req,res,next)=>{
    try {
        const comments = await Comment.find().populate({path:'userId',select: ['firstName','lastName', 'avatar','_id']}).populate({path:'eventId',select: ['title','_id']});
        res.json({comments})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
)

exports.deleteComment = catchAsyncError(async(req,res,next)=>{
    try {
        const comment = await Comment.findOneAndDelete({
            _id: req.params.id,
        })
        if (!comment) {
            return next(new ErrorHandler('Comment not found', 404))
        }
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
}
)