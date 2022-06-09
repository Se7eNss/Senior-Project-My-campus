const mongoose = require ('mongoose');


const reportSchema = mongoose.Schema({
    eventId:{
        type:mongoose.Schema.ObjectId,
        ref:'Event',
        required:false
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
    },
    commentId:{
        type:mongoose.Schema.ObjectId,
        ref:'Comment',
        required:false
    },
    note:{
        type:String,
        required:true,
    },
    seenByAdmin:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    
})

module.exports = mongoose.model('Report',reportSchema);