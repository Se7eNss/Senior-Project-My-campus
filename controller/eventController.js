const catchAsyncError = require('../middlewares/catchAsyncError');
const Event = require('../models/event');
const User = require('../models/user');
const Comment = require('../models/comment');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');
const user = require('../models/user');

//create new event => /api/v1/event/new

exports.newEvent = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;
    try {
        const { title, eventDate, eventImage, description, location,eventEndDate,note } = req.body
        const user = req.user.id
        const result = await cloudinary.v2.uploader.upload(eventImage, {
            folder: 'events',
            width: 650,
            quality: 100,
            crop: "scale"
        })
        const newEvent = new Event({
            title, eventImage: { public_id: result.public_id, url: result.secure_url }, user: user, eventDate: eventDate,eventEndDate:eventEndDate ,description: description, note:note,location: location
        })

        await User.findOneAndUpdate({ _id: user }, {
            $push: { events: newEvent._id }
        }, { new: true })

        await Event.create(newEvent);

        res.json({ newEvent })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

})

//show all event => /api/v1/event

exports.getEvents = catchAsyncError(async (req, res, next) => {
    let now = new Date();
    const data = await Event.find({ $or: [{ status: 'Active' }, { status: 'Upcoming' }, { status: 'Finished' } ] }).populate({ path: 'comments', populate: { path: 'userId', select: ['firstName',"lastName", 'avatar'] } });
    const event =data.map(e => {
        return newEvents ={
            _id: e._id,
            title: e.title,
            eventImage: e.eventImage,
            eventDate: e.eventDate,
            eventEndDate: e.eventEndDate,
            description: e.description,
            location: e.location,
            comments: e.comments,
            user: e.user,
            status: e.status,
            rate: e.comments.reduce((acc, curr) => {
                return acc + curr.rate
            }, 0) / e.comments.length
        }
    })


    res.status(200).json({
        success: true,
        event
    })

})

//event detail => /api/event/:id
exports.eventDetail = catchAsyncError(async (req, res, next) => {
    const event = await Event.findById(req.params.id).populate({ path: 'comments', populate: { path: 'userId', select: ["firstName", 'avatar'] } }).populate({ path: 'user', select: ['lastName',"firstName", 'avatar'] });
    
    res.status(200).json({
        succes: true,
        event
    })

})


//set event active => /api/event/:id
exports.updateStatus = catchAsyncError(async (req, res, next) => {
    const event = await Event.findOne({ user: req.user.id, _id: req.params.id });

    var date1 = Date.now();
    if (event.eventDate === date1) {
        event.status === 'active'
        await event.save();
    }
    if (event.status === 'inactive') {
        return next(new ErrorHandler('Event is inactive ', 400))
    }

    event.status = req.body.status;
    await event.save();

    res.status(200).json({
        succes: true
    })
})


//update event => /api/v1/event/update/:id

exports.updateEvent = catchAsyncError(async (req, res, next) => {
    let event = await Event.findById(req.params.id);
    
    if (!event) {
        res.status(404).json({
            succes: false,
            message: 'event not found'
        })
    }
    event.status = "Pending";
    await event.save();
    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    })

    res.status(200).json({
        success: true,
        event
    })
})

//delete event => /api/v1/event/delete/:id

exports.deleteEvent = catchAsyncError(async (req, res, next) => {
    let event = await Event.findById(req.params.id).populate({ path: 'comments', populate: { path: 'userId', select: ['name', 'avatar','_id'] } });
    if (!event) {
        return next(new ErrorHandler('Event not found', 404))
    }

    User.findOneAndUpdate({ _id: event.user }, {
        $pull: { events: event._id }
    }, { new: true })
    

    event.comments.forEach(async (comment) => {
        await Comment.findByIdAndDelete(comment);
    })
    event.comments.forEach(async (comment) => {
        await User.findByIdAndUpdate(comment.userId._id, {
            $pull: { comments: comment }
        })
    })


    await event.remove();
    res.status(200).json({
        success: true,
        message: 'Event deleted'
    })
})