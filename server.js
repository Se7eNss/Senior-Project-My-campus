const app = require('./app');
const connectDatabase =require('./config/database')
const dotenv = require('dotenv');
const cloudinary = require('cloudinary')

//Handle uncaught expection
process.on('uncaughtException',err=>{
  console.log(`Error : ${err.message}`);
  console.log('Shutting down the server due to uncaught expection')
  process.exit(1)
})

dotenv.config({path: 'config/config.env'});

connectDatabase();

//settup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET 
})

const server = app.listen(process.env.PORT, ()=>{
  console.log(`Server started on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

//Handled promise rejection 
process.on('unhandledRejection', err=>{
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled promise rejection ')
  server.close(()=>{
    process.exit(1);
  })
})