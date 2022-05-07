const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncError');
const crypto = require('crypto');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const cloudinary = require('cloudinary');



// register user api/v1/register

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,password,avatar,instagram,facebook,twitter,faculty,phone} = req.body;

    const result = await cloudinary.v2.uploader.upload(avatar, {
        folder: 'avatars',
        width: 350,
        width: 650,
        quality: 100,
        crop: "scale",
    })
    
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        faculty,
        phone,
        avatar:{
            public_id:result.public_id,
            url:result.secure_url
        },
        instagram,
        facebook,
        twitter,    
    })
    sendToken(user,200,res);
})

// login user => /api/v1/login

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;
    //check email and password not blankj
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password', 400))
    }
    //finding user in db
    const userd = await User.findOne({email}).select('+password');
    
    if(userd.status === true){
        return   next(new ErrorHandler('You banned, Contact with admin.',401))
    }

    if(!userd){
        return   next(new ErrorHandler('Invalid Email or Password',401))
    }

    //checks if password correct or not
    const isPasswordMatched = await userd.comparePassword(password); 

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password',401))
    }
    const user= await User.findById(userd.id)
    sendToken(user,200,res);
})

//forgot password  => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler('User not found with this email',404));
    }

    //get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave : false})
    
    
    //create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const message =`Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`


    try{
            await sendEmail({
                email:user.email,
                subject:'E-commerce Password Recovery',
                message
            })
            res.status(200).json({
                success:true,
                message:`Email sent to ${user.email}`
            })
    }
    catch(error){
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({validateBeforeSave : false})

        return next(new ErrorHandler(error.message,500))    
    }
})

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

    //hash url token
    const resetPasswordToken =crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpired : { $gt : Date.now() }

    })

    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired',400));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match',400));
    }

    //setup new password
    user.password =req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired =undefined;

    await user.save();

    sendToken(user,200,res);
})

// get currently logged in user details  => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).populate('comments');
    res.status(200).json({
        success:true,
        user
    })
})

exports.getUserProfileById = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).populate({path:'comments',populate:{path:'eventId'}}).populate({path:'events',populate:{path:'comments'}});
    const newUser = {
        id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        avatar:user.avatar,
        faculty:user.faculty,
        instagram:user.instagram,
        facebook:user.facebook,
        twitter:user.twitter,
        comments:user.comments,
        events:user.events.filter(event=>event.status !=='deleted')
    }
    res.status(200).json({
        success:true,
        newUser
    })
})

exports.getOthersProfileById = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id).populate({path:'comments',populate:{path:'eventId',select:['title']}});
    const newUser = {
        id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        avatar:user.avatar,
        faculty:user.faculty,
        instagram:user.instagram,
        facebook:user.facebook,
        twitter:user.twitter,
        comments:user.comments
    }
    res.status(200).json({
        success:true,
        newUser
    })
})


// Update / change user password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password');


    //check previous password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if(!isMatched){
        return next(new ErrorHandler('Old password not matched',400));
    }
    user.password = req.body.password;

    await user.save();

    sendToken(user,200,res);
})


//Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req,res,next)=>{
    const {firstName,lastName,avatar,faculty,email,phone,instagram,facebook,twitter,id} =req.body;
    let newUserData={};
    let user ={};
    if(avatar){
        
        const result = await cloudinary.v2.uploader.upload(avatar, {
            folder: 'avatars',
            width: 350,
            width: 650,
            quality: 100,
            crop: "scale",
        })
        console.log(result)
        newUserData = {
            firstName:firstName,
            lastName:lastName,
            avatar:{
                public_id:result.public_id,
                url:result.secure_url
            },
            faculty:faculty,
            email:email,
            phone:phone,
            instagram:instagram,
            facebook:facebook,
            twitter:twitter
        }
        console.log(newUserData)
    }
    else{
        newUserData = {
            firstName:firstName,
            lastName:lastName,
            faculty:faculty,
            email:email,
            phone:phone,
            instagram:instagram,
            facebook:facebook,
            twitter:twitter
        }
    }

    user = await User.findByIdAndUpdate(id, newUserData ,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    }).populate('comments').populate({path:'events',populate:{path:'comments'}});


    res.status(200).json({
        success: true,
        user
    })

})



//logout user => /api/v1/logout

exports.logout = catchAsyncErrors(async (req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:'Logged out'
    })

})
