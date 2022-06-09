const express = require('express');
const router = express.Router();

const {
    createEventReport,
    createCommentReport,
} = require('../controller/reportController');

const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')


router.route('/report/event/:id').post(isAuthenticatedUser,createEventReport);
router.route('/report/comment/:id').post(isAuthenticatedUser,createCommentReport);


module.exports =router;