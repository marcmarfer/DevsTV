const express = require('express');
const router = express.Router();
const usersController = require('./controllers/usersController');
const videoController = require('./controllers/videoController');
const bookmarkedVideoController = require('./controllers/bookmarkedVideoController');

router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);

router.post('/save-video', videoController.saveVideo);
router.get('/videos', videoController.getVideos);

router.post('/save-bookmarked-video', bookmarkedVideoController.saveBookmarkedVideo);
router.get('/bookmarked-videos', bookmarkedVideoController.getBookmarkedVideos);

module.exports = router;
