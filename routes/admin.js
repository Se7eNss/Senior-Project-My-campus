const express = require('express');
const { getAllUsers,
        changeUserStatus,
        getAllEvents,
        changeEventStatus,
        deleteEvent,
        getAllComments,
        deleteComment,
} = require('../controller/adminController');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')


router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('Admin'),getAllUsers);
router.route('/admin/user/:id/:status').put(isAuthenticatedUser,authorizeRoles('Admin'),changeUserStatus);
router.route('/admin/events').get(isAuthenticatedUser,authorizeRoles('Admin'),getAllEvents);
router.route('/admin/event/:id/:status').put(isAuthenticatedUser,authorizeRoles('Admin'),changeEventStatus);
router.route('/admin/event/:id').delete(isAuthenticatedUser,authorizeRoles('Admin'),deleteEvent);
router.route('/admin/comments').get(isAuthenticatedUser,authorizeRoles('Admin'),getAllComments);
router.route('/admin/comment/:id').delete(isAuthenticatedUser,authorizeRoles('Admin'),deleteComment);

module.exports = router;