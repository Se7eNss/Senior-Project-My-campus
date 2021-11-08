const mongoose = require ('mongoose');


const eventSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    location:
        {
            lat:{
                type:Number,
                required:true
            },
            long:{
                type:Number,
                required:true
            }
        }
    ,
    eventDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        default:'Pending',
    },
    title:{
        type:String,
        required:[true,'Please Enter title!'],
        maxLenght:[60,'Your title cannot exeed 60 charcters']
    },
    description:{
        type:String,
        required:[true,'Please Enter description!'],
        maxLenght:[170,'Your title cannot exeed 170 charcters']
    },
    comments:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Comment'
        }
    ],
    eventImage:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

module.exports = mongoose.model('Event',eventSchema);