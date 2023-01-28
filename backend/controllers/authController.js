const User = require('../models/user');

const  ErrorHandler = require('../utils/errorHandler')

const catchAsyncError = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')


// Register a use  === /api/v1/register


exports.registerUser = catchAsyncError (async (req,res,next)=>{
    const {name, email, password}= req.body;
  
    const user  = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'ddefr',
            url:'ddrrrr'
        }
    })

    const token = user.getJwtToken();
    sendToken(user,200,res)
})


//login user api/v1/login

exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password}= req.body;



    if(!email||!password){
        return next(new ErrorHandler('please enter email or password',400))
    }

    //finding user in data base

    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler('invalis email or password',401))

    }

    //check password

    const isPasswordMatch = await user.comparePassword(password)
   if(!isPasswordMatch){
    return next(new ErrorHandler('invalis email or password',401))
   }

   const token = user.getJwtToken();

   sendToken(user,200,res)


})