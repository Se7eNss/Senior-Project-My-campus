const express = require('express');
const app =express();
const cors = require('cors')
const errorMiddleware = require('./middlewares/errors');
const cookieParser =require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const schedule = require('node-schedule');

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors())

const user = require('./routes/user');
const event = require('./routes/event');
const comment = require('./routes/comment');
const admin = require('./routes/admin');
const report = require('./routes/report');

const Event = require('./models/event');

schedule.scheduleJob('0 19 * * *',  async() => {
    const now = new Date();
    try {
        const events = await Event.find().populate({path:'user',select: ['firstName',"lastName"]});
        
        events.forEach(element => {
            if (element.eventEndDate < now && !new Date(element.eventEndDate).setDate(new Date(element.eventEndDate).getDate() + 1) < Date.parse(now)) {
                if(element.status != 'Finished') {
                element.status = 'Finished';
                element.save();
                console.log('Event finished');
                }
                else if(new Date(element.eventEndDate).setDate(new Date(element.eventEndDate).getDate() + 1) < Date.parse(now)) {
                    if(element.status != 'Closed') {
                    element.status = 'Closed';
                    element.save();
                    console.log('events updated closed');
                    }
                }
            }
            if(element.eventDate <= now && element.eventEndDate >= now) {
                if(element.status != 'Active' && element.status == 'Upcoming') {
                element.status = 'Active';
                element.save();
                console.log('events updated active');
                }
            }
            if(element.status === 'Upcoming' || element.status === "Active") {
                if(event?.commentStatus === false) {
                    element.commentStatus = true;
                    element.save();
                    console.log('events updated comment status');
                }
            }
            
        });
    } catch (err) {
        console.log(err)
    }
});


app.use('/api/v1',admin);
app.use('/api/v1',user);
app.use('/api/v1',event);
app.use('/api/v1',comment);
app.use('/api/v1',report);

app.use(errorMiddleware);


module.exports = app