const mongoose = require ('mongoose');


const commnetSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
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
        required:true,
        default:0
    },
    status:{
        type:String,
        required:true,
        default:'active'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

    //after created event model  add ref from event
})

module.exports = mongoose.model('Comment',commnetSchema);