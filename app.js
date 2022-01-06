const express = require('express');
const app =express();
const cors = require('cors')
const errorMiddleware = require('./middlewares/errors');
const cookieParser =require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors())

const user = require('./routes/user');
const event = require('./routes/event');
const comment = require('./routes/comment');




app.use('/api/v1',user);
app.use('/api/v1',event);
app.use('/api/v1',comment);

app.use(errorMiddleware);


module.exports = app