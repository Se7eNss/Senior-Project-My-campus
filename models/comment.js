const mongoose = require ('mongoose');


const commnetSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
    },
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    comment:{
        type:String,
        required:true,
    },
    rate:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        default:'active'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    eventId: {type:mongoose.Schema.ObjectId, ref:'Event'}
})

module.exports = mongoose.model('Comment',commnetSchema);