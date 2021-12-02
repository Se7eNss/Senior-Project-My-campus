const express = require('express');
const router = express.Router();

const {newComment,deleteComment} = require('../controller/commentController')


const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')


router.route('/comment').post(isAuthenticatedUser,newComment);
router.route('/comment/:id').delete(isAuthenticatedUser,deleteComment);

module.exports =router;