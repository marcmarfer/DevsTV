const express = require('express');
const router = express.Router();
const usersController = require('./controllers/usersController');
const videoController = require('./controllers/videoController');
const bookmarkedVideoController = require('./controllers/bookmarkedVideoController');
const authController = require('./controllers/authController');

router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
router.post('/save-user', usersController.addUser);

router.post('/save-video', authController.verifyToken, videoController.saveVideo);
router.get('/videos', videoController.getVideos);

router.post('/save-bookmarked-video', authController.verifyToken, bookmarkedVideoController.saveBookmarkedVideo);
router.get('/bookmarked-videos', authController.verifyToken, bookmarkedVideoController.getBookmarkedVideos);

module.exports = router;
