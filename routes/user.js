const express = require('express');
const router = express.Router();

const{registerUser,
        loginUser,
        forgotPassword,
        resetPassword,
        getUserProfile,
        updatePassword,
        updateProfile,
        logout,
        getUserProfileById,
        getOthersProfileById
                } = require('../controller/userController');
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')




router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);

//profile
router.route('/me').get(isAuthenticatedUser,getUserProfile);
router.route('/profile/:id').get(getOthersProfileById);
router.route('/profile').get(isAuthenticatedUser,getUserProfileById);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/me/update').put(isAuthenticatedUser,updateProfile)


module.exports =router;