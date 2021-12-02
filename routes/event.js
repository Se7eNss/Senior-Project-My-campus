const express = require('express');
const router = express.Router();

const {
        newEvent,
        getEvents,
        updateStatus,
        updateEvent,
        eventDetail,
        deleteEvent
            } = require('../controller/eventController');

const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth')



router.route('/event/new').post(isAuthenticatedUser,newEvent);
router.route('/event').get(getEvents);
router.route('/event/:id').get(eventDetail);
router.route('/event/:id').put(isAuthenticatedUser,updateStatus);
router.route('/event/update/:id').put(isAuthenticatedUser,updateEvent);
router.route('/event/delete/:id').delete(isAuthenticatedUser,deleteEvent);

module.exports = router