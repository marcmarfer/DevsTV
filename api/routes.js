const express = require('express');
const router = express.Router();
const videoController = require('./controllers/videoController');
const bookmarkedController = require('./controllers/bookmarkedController');

router.get('/videos', videoController.getVideos);
router.get('/bookmarked-videos', bookmarkedController.getBookmarkedVideos);

router.post('/save-video', videoController.saveVideo);
router.post('/save-bookmarked-video', bookmarkedController.saveBookmarkedVideo);

module.exports = router;
