const catchAsyncError = require('../middlewares/catchAsyncError');
const Event = require('../models/event');
const User = require('../models/user');
const Comment = require('../models/comment');
const Report = require('../models/report');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');


exports.createEventReport = catchAsyncError(async(req,res,next)=>{
    try{
        const reports = await Report.find();
   

    const eventId = req.params.id;
    const {userId,note} = req.body;

    reports.map(report=>{
        if(report.eventId == eventId && report.userId == userId){
            return res.status(400).json('You have already reported this comment')
        }
    })

    const report = await Report.create({eventId,userId,note});
    res.status(200).json({report})
    }
    catch(err){
        return res.status(500).json({msg: err.message})
    }
})

exports.createCommentReport = catchAsyncError(async(req,res,next)=>{
    try{
    const reports = await Report.find();
    const commentId = req.params.id;
    const {userId,note} = req.body;
    reports.map(report=>{
        if(report.commentId == commentId && report.userId == userId){
            return res.status(400).json('You have already reported this comment')
        }
    })
    const report = await Report.create({commentId:commentId,userId,note});
    res.status(200).json({report})
    }
    catch(err){
        return res.status(500).json({msg: err.message})
    }
})