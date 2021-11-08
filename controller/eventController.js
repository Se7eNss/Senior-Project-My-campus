const catchAsyncError = require('../middlewares/catchAsyncError');
const Event = require('../models/event');
const ErrorHandler = require('../utils/errorHandler');


//create new event => /api/v1/event/new

exports.newEvent = catchAsyncError(async(req,res,next)=>{
    req.body.user = req.user.id;

    const event = await Event.create(req.body);
    res.status(201).json({
        success:true,
        event
    })
})

//show all event => /api/v1/event

exports.getEvents = catchAsyncError(async(req,res,next)=>{
    const event = await Event.find({status:'Pending'});

    res.status(200).json({
        success:true,
        event
    })
    
})

//set event active => /api/event/:id
exports.updateStatus= catchAsyncError(async(req,res,next)=>{
    const event = await Event.findOne({user:req.user.id ,_id:req.params.id});

    var date1 = Date.now();
    if(event.eventDate === date1){
        event.status === 'active'
        await event.save();
    }
    if(event.status === 'inactive'){
        return next(new ErrorHandler('Event is inactive ',400))
    }
    
    event.status = req.body.status;
    await event.save();

    res.status(200).json({
        succes:true
    })
})


//update event => /api/v1/event/update/:id

exports.updateEvent = catchAsyncError(async(req,res,next)=>{
    let event  = await Event.findById(req.params.id);
    
    if(!event){
        res.status(404).json({
            succes:false,
            message:'event not found'
        })
    }

    event = await Event.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:true,
    })

    res.status(200).json({
        success:true,
        event
    })
})

//delete event => /api/v1/event/delete/:id

exports.deleteEvent = catchAsyncError(async(req,res,next)=>{
    let event = Event.findById(req.params.id);
    if(!event){
        return next(new ErrorHandler('Event not found', 404))
    }

    await event.remove();
    res.status(200).json({
        success:true,
        message:'Product deleted'
    })
})